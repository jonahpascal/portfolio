import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { CompetencesPage } from './pages/CompetencesPage';
import { CompetenceDetailPage } from './pages/CompetenceDetailPage';
import { AboutPage } from './pages/AboutPage';
import { CvPage } from './pages/CvPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projets" element={<ProjectsPage />} />
          <Route path="projets/:slug" element={<ProjectDetailPage />} />
          <Route path="competences" element={<CompetencesPage />} />
          <Route path="competences/:id" element={<CompetenceDetailPage />} />
          <Route path="parcours" element={<AboutPage />} />
          <Route path="cv" element={<CvPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
