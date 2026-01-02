import { useNavigate } from 'react-router-dom';
import { useFunnel, createFunnelSteps } from '@use-funnel/react-router-dom';
import { funnelStepsById } from '@/data/funnelData';
import { FunnelStep } from '@/components/funnel/FunnelStep';
import { CommonService } from '../comm/common.service';

const commonService = new CommonService();

/**
 * 펀널에서 수집할 전체 데이터 타입
 */
interface FunnelData {
  'party-size'?: string;
  taste?: string;
  texture?: string;
  temperature?: string;
  speed?: string;
  atmosphere?: string;
}

/**
 * createFunnelSteps를 사용하여 타입 안전한 스텝 정의
 */
const steps = createFunnelSteps<FunnelData>()
  .extends('party-size')
  .extends('taste', { requiredKeys: 'party-size' })
  .extends('texture', { requiredKeys: 'taste' })
  .extends('temperature', { requiredKeys: 'texture' })
  .extends('speed', { requiredKeys: 'temperature' })
  .extends('atmosphere', { requiredKeys: 'speed' })
  .build();

export function FunnelPage() {
  const navigate = useNavigate();
  const funnel = useFunnel({
    id: 'siksa-funnel',
    steps: steps,
    initial: {
      step: 'party-size',
      context: {},
    },
  });

  return (
    <funnel.Render
      party-size={({ history }) => (
        <FunnelStep
          data={funnelStepsById['party-size']}
          onSelect={(val) => history.push('taste', { 'party-size': val })}
          selectedValue={undefined}
        />
      )}
      taste={({ context, history }) => (
        <FunnelStep
          data={funnelStepsById['taste']}
          onSelect={(val) =>
            history.push('texture', { ...context, taste: val })
          }
          selectedValue={context.taste}
          onBack={() => history.back()}
        />
      )}
      texture={({ context, history }) => (
        <FunnelStep
          data={funnelStepsById['texture']}
          onSelect={(val) =>
            history.push('temperature', { ...context, texture: val })
          }
          selectedValue={context.texture}
          onBack={() => history.back()}
        />
      )}
      temperature={({ context, history }) => (
        <FunnelStep
          data={funnelStepsById['temperature']}
          onSelect={(val) =>
            history.push('speed', { ...context, temperature: val })
          }
          selectedValue={context.temperature}
          onBack={() => history.back()}
        />
      )}
      speed={({ context, history }) => (
        <FunnelStep
          data={funnelStepsById['avoid']}
          onSelect={(val) =>
            history.push('atmosphere', { ...context, speed: val })
          }
          selectedValue={context.speed}
          onBack={() => history.back()}
        />
      )}
      atmosphere={({ context, history }) => (
        <FunnelStep
          data={funnelStepsById['aftermeal']}
          onSelect={async (val) => {
            const finalContext = { ...context, atmosphere: val };
            try {
                const res = await commonService.requestService({
                    serviceId: 'answer',
                    data: finalContext,
                });
                console.log('데이터 저장 성공:', res);
                
            } catch (error) {
                console.error('데이터 저장 중 오류 발생:', error);
                history.back();
                return; // 저장 실패 시 키워드 검색 진행하지 않음
            }
            console.log('Completed Funnel:', finalContext);
            navigate('/loading', { state: finalContext });
          }}
          selectedValue={context.atmosphere}
          onBack={() => history.back()}
        />
      )}
    />
  );
}
