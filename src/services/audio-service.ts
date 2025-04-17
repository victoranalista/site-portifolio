interface AudioResources {
  [key: string]: HTMLAudioElement;
}

export class AudioService {
  private audioElements: AudioResources = {};
  private initialized = false;

  constructor(audioMap: Record<string, string>) {
    if (typeof window === "undefined") return;

    Object.entries(audioMap).forEach(([key, src]) => {
      this.audioElements[key] = new Audio(src);
    });
  }

  initialize(): void {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;
  }

  async play(
    key: string,
    options?: { loop?: boolean; volume?: number }
  ): Promise<void> {
    if (!this.initialized || typeof window === "undefined") return;

    const audio = this.audioElements[key];
    if (!audio) return;

    if (options?.loop !== undefined) {
      audio.loop = options.loop;
    }

    if (options?.volume !== undefined) {
      audio.volume = options.volume;
    }

    try {
      await audio.play();
    } catch (error) {
      console.warn(`Could not play audio ${key}:`, error);
    }
  }

  pause(key: string): void {
    if (!this.initialized || typeof window === "undefined") return;

    const audio = this.audioElements[key];
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }

  pauseAll(): void {
    if (!this.initialized || typeof window === "undefined") return;

    Object.values(this.audioElements).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}
