import { useNavigate } from "react-router-dom";
import { useFunnel } from "@use-funnel/react-router-dom";
import { funnelSteps } from "@/data/funnelData";
import { FunnelStep } from "@/components/funnel/FunnelStep";

// Define the accumulated context for each step
type FunnelContext = {
  "party-size": { [key: string]: any }; // Initial step has empty or minimal context
  taste: { "party-size": string };
  texture: { "party-size": string; taste: string };
  temperature: { "party-size": string; taste: string; texture: string };
  speed: { "party-size": string; taste: string; texture: string; temperature: string };
  atmosphere: { "party-size": string; taste: string; texture: string; temperature: string; speed: string };
}

const steps = [
  "party-size",
  "taste",
  "texture",
  "temperature",
  "speed",
  "atmosphere",
] as const;

export function FunnelPage() {
  const navigate = useNavigate();
  const funnel = useFunnel<FunnelContext>({
    id: "siksa-funnel",
    steps: steps,
    initial: {
      step: "party-size",
      context: {},
    },
  });

  // Helper to safely get the next step's context
  const handleSelect = <T extends keyof FunnelContext>(
    currentStep: T, 
    value: string, 
    nextStep?: keyof FunnelContext
  ) => {
    // Current context is inferred based on step, but simplified here
    const currentContext = funnel.context; 
    const nextContext = { ...currentContext, [currentStep]: value };

    if (nextStep) {
      // We need to cast or ensure nextContext matches the expected type for nextStep
      // @ts-ignore - Dynamic funnel typing is tricky, ensuring runtime correctness
      funnel.history.push(nextStep, nextContext);
    } else {
      console.log("Completed Funnel:", nextContext);
      navigate("/result");
    }
  };

  return (
    <funnel.Render
      party-size={({ history }) => (
        <FunnelStep
          data={funnelSteps.find((s) => s.id === "party-size")!}
          onSelect={(val) => handleSelect("party-size", val, "taste")}
          selectedValue={funnel.context["party-size"] as string}
        />
      )}
      taste={({ history }) => (
        <FunnelStep
          data={funnelSteps.find((s) => s.id === "taste")!}
          onSelect={(val) => handleSelect("taste", val, "texture")}
          selectedValue={(funnel.context as any).taste}
          onBack={() => history.back()}
        />
      )}
      texture={({ history }) => (
        <FunnelStep
          data={funnelSteps.find((s) => s.id === "texture")!}
          onSelect={(val) => handleSelect("texture", val, "temperature")}
          selectedValue={(funnel.context as any).texture}
          onBack={() => history.back()}
        />
      )}
      temperature={({ history }) => (
        <FunnelStep
          data={funnelSteps.find((s) => s.id === "temperature")!}
          onSelect={(val) => handleSelect("temperature", val, "speed")}
          selectedValue={(funnel.context as any).temperature}
          onBack={() => history.back()}
        />
      )}
      speed={({ history }) => (
        <FunnelStep
          data={funnelSteps.find((s) => s.id === "speed")!}
          onSelect={(val) => handleSelect("speed", val, "atmosphere")}
          selectedValue={(funnel.context as any).speed}
          onBack={() => history.back()}
        />
      )}
      atmosphere={({ history }) => (
        <FunnelStep
          data={funnelSteps.find((s) => s.id === "atmosphere")!}
          onSelect={(val) => handleSelect("atmosphere", val, undefined)}
          selectedValue={(funnel.context as any).atmosphere}
          onBack={() => history.back()}
        />
      )}
    />
  );
}
