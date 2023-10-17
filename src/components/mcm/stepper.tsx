import { McmHelperStepper } from '@/config.ts'
import { useMcm } from '@/hooks/mcm/use-mcm.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import ControlTextTooltip from '@/components/mcm/control-text-tooltip.tsx'
import { Slot } from '@radix-ui/react-slot'
import { useHelpTextHandler } from '@/hooks/mcm/use-help-text-handler.tsx'
import { cn } from '@/lib/utils.ts'
import DisplayControlGroupConfig from '@/components/mcm/display-control-group-config.tsx'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'

export default function Stepper({ control, isAfterHeader }: { control: McmHelperStepper; isAfterHeader: boolean }) {
  const { t, evaluateCondition } = useMcm()
  const text = t(control.text)
  const helpTextHandler = useHelpTextHandler(control.help)
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <div
      className={cn(
        'flex h-10 cursor-pointer items-center justify-between whitespace-nowrap text-left',
        isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior),
        isAfterHeader && 'pl-3',
      )}
      {...helpTextHandler}
    >
      <Slot style={{ color: getHexColorFromText(text) }}>
        <ControlTextTooltip controlText={control.text} className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span>{removeColorTagFromText(text)}</span>
          <DisplayControlGroupConfig control={control} />
        </ControlTextTooltip>
      </Slot>
      <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">Stepper</div>
    </div>
  )
}
