import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  BrainCircuit,
  CandlestickChart,
  CheckCircle2,
  CircleDollarSign,
  CloudLightning,
  Cpu,
  Database,
  FileText,
  FlaskConical,
  Gauge,
  Layers,
  LineChart,
  LockKeyhole,
  MessageSquareText,
  Pause,
  Play,
  PlugZap,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  Target,
  TrendingUp,
  Upload,
  Wallet
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { OmegaIcon } from "../types";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const omegaIcons: Record<OmegaIcon, IconComponent> = {
  activity: Activity,
  alert: AlertTriangle,
  barChart: BarChart3,
  bell: Bell,
  bot: Bot,
  brain: BrainCircuit,
  candles: CandlestickChart,
  check: CheckCircle2,
  cloud: CloudLightning,
  cpu: Cpu,
  database: Database,
  dollar: CircleDollarSign,
  file: FileText,
  flask: FlaskConical,
  gauge: Gauge,
  layers: Layers,
  lineChart: LineChart,
  lock: LockKeyhole,
  message: MessageSquareText,
  pause: Pause,
  play: Play,
  plug: PlugZap,
  radio: Radio,
  search: Search,
  settings: Settings,
  shield: ShieldCheck,
  target: Target,
  trend: TrendingUp,
  upload: Upload,
  wallet: Wallet
};

export function getOmegaIcon(icon: OmegaIcon) {
  return omegaIcons[icon];
}

export function OmegaIconView({ icon, ...props }: SVGProps<SVGSVGElement> & { icon: OmegaIcon }) {
  switch (icon) {
    case "activity":
      return <Activity {...props} />;
    case "alert":
      return <AlertTriangle {...props} />;
    case "barChart":
      return <BarChart3 {...props} />;
    case "bell":
      return <Bell {...props} />;
    case "bot":
      return <Bot {...props} />;
    case "brain":
      return <BrainCircuit {...props} />;
    case "candles":
      return <CandlestickChart {...props} />;
    case "check":
      return <CheckCircle2 {...props} />;
    case "cloud":
      return <CloudLightning {...props} />;
    case "cpu":
      return <Cpu {...props} />;
    case "database":
      return <Database {...props} />;
    case "dollar":
      return <CircleDollarSign {...props} />;
    case "file":
      return <FileText {...props} />;
    case "flask":
      return <FlaskConical {...props} />;
    case "gauge":
      return <Gauge {...props} />;
    case "layers":
      return <Layers {...props} />;
    case "lineChart":
      return <LineChart {...props} />;
    case "lock":
      return <LockKeyhole {...props} />;
    case "message":
      return <MessageSquareText {...props} />;
    case "pause":
      return <Pause {...props} />;
    case "play":
      return <Play {...props} />;
    case "plug":
      return <PlugZap {...props} />;
    case "radio":
      return <Radio {...props} />;
    case "search":
      return <Search {...props} />;
    case "settings":
      return <Settings {...props} />;
    case "shield":
      return <ShieldCheck {...props} />;
    case "target":
      return <Target {...props} />;
    case "trend":
      return <TrendingUp {...props} />;
    case "upload":
      return <Upload {...props} />;
    case "wallet":
      return <Wallet {...props} />;
  }
}
