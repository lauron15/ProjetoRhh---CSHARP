import { Candidato } from "./components/Candidatos/Candidato";
import { CandidatoForm } from "./components/Candidatos/CandidatoForm";
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
  },
  {
    // path é a rota, ou no caso o caminho e element e o nome do component que você vai usar
    // geralmente usamos sempre um component "pai" e atribuimos components filhos
    // dentro do pai, mas o principal sempre vai ser o pai
    path: '/candidato/:candidatoId',
    element: <CandidatoForm />
  }
];

export default AppRoutes;
