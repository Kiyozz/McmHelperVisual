import { McmHelperHeader } from '@/config.ts'
import ControlTextTooltip from '@/components/page/control-text-tooltip.tsx'
import { getHexColorFromText, removeColorTagFromText } from '@/lib/color-from-text.tsx'
import DisplayControlGroupConfig from '@/components/page/display-control-group-config.tsx'
import { cn } from '@/lib/utils.ts'
import { classnameByGroupBehavior } from '@/lib/classname-by-group-behavior.ts'
import { useEvaluateGroupCondition } from '@/hooks/use-evaluate-group-condition.ts'
import { useT } from '@/hooks/use-t.ts'
import HelpText from '@/components/page/help-text.tsx'

export default function Header({ control }: { control: McmHelperHeader }) {
  const t = useT()
  const evaluateCondition = useEvaluateGroupCondition()

  const text = t(control.text)
  const isControlEvaluated = evaluateCondition(control.groupCondition)

  return (
    <h2
      className={cn(
        'group flex h-10 items-center gap-3 font-bold text-foreground',
        isControlEvaluated !== undefined && !isControlEvaluated && classnameByGroupBehavior(control.groupBehavior),
      )}
    >
      <ControlTextTooltip controlText={control.text} asChild>
        <span style={{ color: getHexColorFromText(text) }} className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span>{removeColorTagFromText(text)}</span>

          <DisplayControlGroupConfig control={control} />
        </span>
      </ControlTextTooltip>
      <span className="h-1.5 grow border-y border-r border-foreground" />
      <HelpText control={control} />
    </h2>
  )
}
