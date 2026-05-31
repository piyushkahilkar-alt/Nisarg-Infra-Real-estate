import { motion } from 'motion/react';
import { CheckCircle2, Clock } from 'lucide-react';

export const ProjectTimeline = ({ currentStageIndex = 0 }: { currentStageIndex?: number }) => {
  const stages = [
    { title: 'Planning', description: 'Layout design & approvals' },
    { title: 'Land Development', description: 'Leveling & demarcation' },
    { title: 'Amenities', description: 'Roads, club & park' },
    { title: 'Completion', description: 'Ready to build/move' }
  ];

  return (
    <div className="relative mt-8">
      {/* Connector Line */}
      <div className="absolute top-6 left-0 w-full h-1 bg-[#E2E8F0] rounded-full hidden md:block"></div>
      
      {/* Active Line */}
      <div 
        className="absolute top-6 left-0 h-1 bg-[#137A35] rounded-full hidden md:block transition-all duration-1000 ease-in-out"
        style={{ width: `${(Math.min(currentStageIndex, stages.length - 1) / (stages.length - 1)) * 100}%` }}
      ></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {stages.map((stage, i) => {
          const isCompleted = i < currentStageIndex;
          const isActive = i === currentStageIndex;

          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex md:flex-col items-center md:items-center text-left md:text-center ${isActive ? 'opacity-100' : 'opacity-60'}`}
            >
              {/* Step Icon */}
              <div className={`w-12 h-12 flex items-center justify-center rounded-full border-[3px] mb-4 shrink-0 mr-4 md:mr-0 transition-colors duration-500
                ${isCompleted ? 'bg-[#137A35] border-[#137A35] text-white' : 
                  isActive ? 'bg-white border-[#137A35] text-[#137A35]' : 
                  'bg-white border-[#CBD5E1] text-[#94A3B8]'}`}
              >
                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : isActive ? <Clock className="w-6 h-6 animate-pulse" /> : <span className="font-bold">{i + 1}</span>}
              </div>

              {/* Text Content */}
              <div>
                <h4 className={`font-bold text-[15px] ${isActive ? 'text-[#1E293B]' : 'text-[#64748B]'}`}>{stage.title}</h4>
                <p className="text-[#94A3B8] text-xs font-medium mt-1 uppercase tracking-wider">{stage.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
