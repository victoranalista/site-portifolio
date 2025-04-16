"use client"

import {
  GithubIcon,
  LinkedinIcon,
  MoonIcon,
  SunIcon,
  FileCheck,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import React from "react"
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion"
import { useInView } from "react-intersection-observer"
import Typed from "typed.js"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()"
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    function draw() {
      if (!ctx) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      if (canvas) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.fillStyle = "#0F0"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (
          canvas &&
          drops[i] * fontSize > canvas.height &&
          Math.random() > 0.975
        ) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)
    return () => clearInterval(interval)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />
}

function TypewriterEffect({
  text,
  onComplete,
}: {
  text: string
  onComplete?: () => void
}) {
  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [text],
      typeSpeed: 50,
      showCursor: true,
      cursorChar: "|",

      onComplete: () => {
        if (onComplete) {
          onComplete()
        }
      },
    })

    return () => typed.destroy()
  }, [text, onComplete])

  return <span ref={el} />
}

function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 2.5
        if (nextProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return nextProgress
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="text-center">
        <Progress value={progress} className="w-64" />
        <p className="text-gray-500 text-lg mt-4">
          Desencapsulando sistema{progress < 100 ? "..." : " concluído!"}
        </p>
      </div>
    </div>
  )
}

function TerminalAnimation({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const audioRefs = useRef({
    typing: new Audio("/audio/teclado.mp3"),
    ambient: new Audio("/audio/suspense.mp3"),
    doorOpen: new Audio("/audio/porta.mp3"),
  })

  // Check if we've shown the terminal before
  useEffect(() => {
    const hasShownTerminal = localStorage.getItem("hasShownTerminal")
    if (hasShownTerminal === "true") {
      // Skip the animation if already shown
      onComplete()
    }
  }, [onComplete])

  // Setup audio after user interaction
  useEffect(() => {
    if (userInteracted) {
      audioRefs.current.typing.volume = 0.9
      audioRefs.current.ambient.volume = 0.6
      audioRefs.current.ambient.loop = true

      try {
        audioRefs.current.ambient.play().catch((error) => {
          console.log("Audio play prevented:", error)
        })
      } catch (error) {
        console.log("Audio play error:", error)
      }

      const currentAudioRefs = audioRefs.current
      return () => {
        Object.values(currentAudioRefs).forEach((audio) => {
          audio.pause()
          audio.currentTime = 0
        })
      }
    }
  }, [userInteracted])

  const steps = [
    "INICIANDO PROTOCOLO DE SEGURANÇA...",
    "VERIFICANDO CREDENCIAIS DE INOVAÇÃO...",
    "ACESSANDO BASE DE CONHECIMENTO...",
    "ANALISANDO POTENCIAL DE MODERNIZAÇÃO...",
    "PREPARANDO DEMONSTRAÇÃO DE CAPACIDADES...",
    "DESENVOLVEDOR PRONTO PARA DESENCAPSULAMENTO...",
  ]

  const handleStepComplete = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
      try {
        audioRefs.current.typing.currentTime = 0
        audioRefs.current.typing.play().catch((error) => {
          console.log("Typing audio play prevented:", error)
        })
      } catch (error) {
        console.log("Typing audio error:", error)
      }
    }
  }

  const handleInitiateSystem = async () => {
    setIsLoading(true)

    try {
      audioRefs.current.ambient.pause()
      audioRefs.current.doorOpen.play().catch((error) => {
        console.log("Door open audio play prevented:", error)
      })
    } catch (error) {
      console.log("Door open audio error:", error)
    }

    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Set flag in localStorage to skip animation on reload
    localStorage.setItem("hasShownTerminal", "true")

    onComplete()
  }

  // If not interacted, show button to start
  if (!userInteracted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black flex items-center justify-center z-50"
      >
        <MatrixRain />
        <div className="relative z-10 bg-black/90 p-8 rounded-lg border border-emerald-500 max-w-3xl w-full mx-4 text-center">
          <h2 className="text-2xl text-emerald-500 mb-6">
            Portfólio Dev Victor
          </h2>
          <Button
            onClick={() => setUserInteracted(true)}
            size="lg"
            className="bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-300 font-bold text-lg px-8 py-6"
          >
            ENTRAR
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <MatrixRain />

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="relative z-10 bg-black/90 p-8 rounded-lg border border-emerald-500 max-w-3xl w-full mx-4">
          <div className="flex items-center gap-2 mb-4 text-emerald-500">
            <FileCheck className="w-6 h-6" />
            <span className="text-lg font-bold">
              PROTOCOLO DE INOVAÇÃO DE DESENVOLVIMENTO
            </span>
          </div>

          <div className="font-mono text-emerald-500 min-h-[200px] relative">
            <TypewriterEffect
              text={steps[currentStep]}
              onComplete={handleStepComplete}
            />

            {currentStep === steps.length - 1 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-8 flex justify-center"
              >
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 border-4 border-emerald-500 rounded-full"
                  />
                  <Avatar className="w-32 h-32 ring-4 ring-emerald-500">
                    <AvatarImage src="https://github.com/victoranalista.png" />
                    <AvatarFallback>VA</AvatarFallback>
                  </Avatar>
                </div>
              </motion.div>
            )}
          </div>

          {currentStep === steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8"
            >
              <Button
                onClick={handleInitiateSystem}
                size="lg"
                className="bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-300 font-bold text-lg px-8 py-6"
              >
                INICIAR DESENCAPSULAMENTO
              </Button>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
}

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeIn}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

function App() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const { scrollYProgress } = useScroll()

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
     document.title = "Portfólio Victor"
    setMounted(true)
    const hasShownTerminal = localStorage.getItem("hasShownTerminal")
    if (hasShownTerminal === "true") {
      setShowContent(true)
    }
  }, [])

  if (!mounted) {
    return null
  }

  const technologies = [
    { name: "TypeScript", proficiency: 90 },
    { name: "JavaScript", proficiency: 95 },
    { name: "Next.js", proficiency: 85 },
    { name: "Node.js", proficiency: 88 },
    { name: "Tailwind CSS", proficiency: 92 },
    { name: "PostgreSQL", proficiency: 85 },
    { name: "Docker", proficiency: 80 },
    { name: "Kubernetes", proficiency: 75 },
    { name: "Prisma", proficiency: 88 },
    { name: "Clean Architecture", proficiency: 85 },
  ]

  const tools = [
    "Firebase",
    "Google Cloud",
    "Vercel",
    "NextAuth",
    "Jest",
    "ESLint",
    "PostgreSQL",
    "Príncipio SOLID",
    "Edge Functions",
    "Shadcn UI",
    "Docker",
    "NestJS",
    "NextJS",
    "Node"
  ]

  return (
    <>
      <AnimatePresence>
        {!showContent && (
          <TerminalAnimation
            onComplete={() => {
              setShowContent(true)
            }}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-background text-foreground">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50"
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold"
            >
              Victor
            </motion.h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </motion.header>

        <main className="container mx-auto px-4 pt-24 pb-12 space-y-24">
          <AnimatedSection>
            <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-12">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, duration: 1 }}
                className="relative group"
              >
                <Avatar className="w-64 h-64 ring-4 ring-emerald-500/20 transition-all duration-500">
                  <AvatarImage
                    src="https://github.com/victoranalista.png"
                    className="transition-all duration-500 filter group-hover:grayscale"
                  />
                  <AvatarFallback>VA</AvatarFallback>
                </Avatar>
              </motion.div>
              <div className="text-center md:text-left max-w-2xl">
                <motion.div
                  style={{ opacity: titleOpacity, scale: titleScale }}
                  className="space-y-4"
                >
                  <h2 className="text-6xl font-bold mb-4 gradient-text">
                    Desenvolvedor Fullstack Pleno
                  </h2>
                  <p className="text-2xl text-muted-foreground mb-8">
                    Cartório Colorado (Brasília - DF)
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Button
                      asChild
                      size="lg"
                      className="gap-2 bg-emerald-500 hover:bg-emerald-600"
                    >
                      <a
                        href="https://github.com/victoranalista"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon className="w-5 h-5" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="gap-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"
                    >
                      <a
                        href="https://www.linkedin.com/in/victoranalista7/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedinIcon className="w-5 h-5" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500"
                    >
                      Download CV
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>
          </AnimatedSection>

          {showContent && (
            <>
              <AnimatedSection className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-3xl -z-10"
                />
                <Card className="bg-background/60 backdrop-blur transform-gpu hover:scale-[1.02] transition-transform duration-300">
                  <CardHeader>
                    <CardTitle className="text-3xl">Sobre Mim</CardTitle>
                  </CardHeader>
                  <CardContent className="text-lg leading-relaxed space-y-4">
                    <p>
                      Desenvolvedor Fullstack Pleno com experiência em
                      desenvolvimento de soluções complexas e escaláveis.
                      Especializado em arquitetura limpa, princípios SOLID e
                      desenvolvimento orientado a testes.
                    </p>
                    <p>
                      Atualmente focado em criar soluções inovadoras para o
                      setor cartorário, combinando tecnologias modernas com
                      necessidades do negócio.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection>
                <motion.section variants={slideIn}>
                  <h3 className="text-3xl font-bold mb-8">
                    Projetos em Destaque
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="group-hover:text-purple-600 transition-colors">
                            Sistema de Notificações Extrajudiciais
                          </CardTitle>
                          <CardDescription>
                            Sistema completo para gestão e automação de
                            notificações extrajudiciais
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-2">
                            <li>Upload de lotes de arquivos</li>
                            <li>Extração automática com IA de dados</li>
                            <li>Integração com Google Maps</li>
                            <li>Geração de rotas inteligentes</li>
                            <li>Autenticação segura com NextAuth</li>
                            <li>App mobile para entregadores</li>
                            <li>Sistema de tentativas e reprogramação</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="group-hover:text-purple-600 transition-colors">
                            Sistema Financeiro Cartorário
                          </CardTitle>
                          <CardDescription>
                            Em desenvolvimento - Sistema completo para gestão
                            financeira cartorária
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-2">
                            <li>Geração automática de NF</li>
                            <li>Sistema de pagamentos integrado</li>
                            <li>Dashboard analítico</li>
                            <li>Automação de pagamentos</li>
                            <li>Análise com GPT API</li>
                            <li>API Rest para integração com sistemas</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.section>
              </AnimatedSection>

              <AnimatedSection>
                <section>
                  <h3 className="text-3xl font-bold mb-8">Tecnologias</h3>
                  <Card className="p-6">
                    <div className="grid md:grid-cols-2 gap-12">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <h4 className="text-xl font-semibold mb-4">
                          Principais Habilidades
                        </h4>
                        {technologies.map((tech, index) => (
                          <motion.div
                            key={tech.name}
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-2"
                          >
                            <div className="flex justify-between">
                              <span>{tech.name}</span>
                              <span>{tech.proficiency}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-emerald-500 h-2 rounded-full"
                                style={{ width: `${tech.proficiency}%` }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="text-xl font-semibold mb-4">
                          Ferramentas & Tecnologias
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {tools.map((tool, index) => (
                            <motion.div
                              key={tool}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge
                                      variant="secondary"
                                      className="text-sm py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                      {tool}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{tool}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </section>
              </AnimatedSection>

              <Separator className="my-12" />

              <AnimatedSection>
                <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h3 className="text-3xl font-bold mb-8">Contato</h3>
                  <div className="flex justify-center gap-4">
                    <Button asChild size="lg" className="gap-2">
                      <a
                        href="https://github.com/victoranalista"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon className="w-5 h-5" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="gap-2"
                    >
                      <a
                        href="https://www.linkedin.com/in/victoranalista7/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedinIcon className="w-5 h-5" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </motion.section>
              </AnimatedSection>
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default App
