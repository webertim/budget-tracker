import BudgetMonth from './components/budgetMonth';
import CircleSwipe from './components/circleSwipe';
import { DataProvider } from './components/dataProvider';

const today = new Date();
const mountMonth = new Date(today.getFullYear(), today.getMonth(), 1);

function App() {
  return (
    <DataProvider>
      <div className="w-full h-full">
        <CircleSwipe ChildComponent={BudgetMonth} childProps={{ mountMonth }} />
      </div>
    </DataProvider>
  );
}

export default App;
