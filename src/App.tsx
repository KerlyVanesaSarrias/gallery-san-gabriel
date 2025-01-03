
import { PlusIcon } from "@heroicons/react/16/solid";
import { Button } from "./ui-elments/components";

function App() {
  return (
    <div className="font-">
      <Button iconLeft={<PlusIcon className="size-5" />} color="primary" size="medium" label="Inicio" />
      <Button iconLeft={<PlusIcon className="size-5" />} color="secondary" size="medium" label="Inicio" />
      <Button iconLeft={<PlusIcon className="size-5" />} color="tertiary" size="medium" label="Inicio" />
      <Button iconLeft={<PlusIcon className="size-5" />} color="tertiary" size="small" label="Inicio" />
    </div>
  )
}

export default App;
