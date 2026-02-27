import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import { Progress } from './progress';
import { Star } from 'lucide-react';

const ProgressTracked = () => {
  return (
    <div>
      <AnimatedWrapper direction="y" distance={40}>
        <h2 className="text-xl text-(--text-third) font-bold">
          كيف يتم تتبّع التقدّم؟
        </h2>
      </AnimatedWrapper>
      <AnimatedWrapper direction="y" distance={70}>
        <div className="bg-transparent text-lg border-2 border-(--bg-slate-100) p-4 rounded-xl mt-2">
          <Progress
            label="يتم قياس تقدّم الحملة بناءً على عدد النجوم التي يتم جمعها."
            labelClassName="text-(--brand-primary) text-base justify-start"
            value={30}
            LabelIcon={Star}
            labelIconClassName="text-(--bg-bold-blue)!"
          />
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default ProgressTracked;
