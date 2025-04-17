import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { StorageService } from "../services/storage-service";

interface PortfolioContextType {
  showContent: boolean;
  setShowContent: (value: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasShownTerminal = StorageService.getItem("hasShownTerminal");
    if (hasShownTerminal === "true") {
      setShowContent(true);
    }

    document.title = "Portfólio Victor";
  }, []);

  return (
    <PortfolioContext.Provider value={{ showContent, setShowContent }}>
      {children}
    </PortfolioContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio(): PortfolioContextType {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
