import { Candidato } from "./components/Candidatos/Candidato";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Vagas from "./components/Vagas/Vagas";
import { VagasForm } from "./components/Vagas/VagasForm";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/vagas',
    element: <Vagas />
  },
  {
    path: '/vagas/:vagaId',
    element: <VagasForm />
  },
  {
    path: '/candidato',
    element: <Candidato />
  }
];

export default AppRoutes;
