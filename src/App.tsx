
import ItemsTable from './components/ItemsTable';
import ItemsForm from './components/ItemsForm';

import 'tailwindcss/tailwind.css';

function App() {

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen gap-10">
      <ItemsForm />
      <ItemsTable />
    </div>
  )
}

export default App;
