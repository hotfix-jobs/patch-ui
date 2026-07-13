import { SourceCode } from "./source-code";

interface UsageProps {
  code: string;
  language?: string;
}

export function Usage({ code, language = "tsx" }: UsageProps) {
  return <SourceCode code={code} language={language} />;
}
