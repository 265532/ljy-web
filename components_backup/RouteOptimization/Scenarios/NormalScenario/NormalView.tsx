
import React from 'react';
import ComparisonTable from '../../ComparisonTable';
import SensitivityChart from '../../SensitivityChart';
import RobustDetail from '../../RobustDetail';

const NormalView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-700">
      {/* Middle Grid: Comparison Table + Sensitivity Chart */}
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 xl:col-span-8">
          <ComparisonTable />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <SensitivityChart />
        </div>
      </div>

      {/* Bottom Section: Robust Detail */}
      <RobustDetail />
    </div>
  );
};

export default NormalView;
