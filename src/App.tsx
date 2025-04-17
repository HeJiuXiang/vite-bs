import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout';
import Home from './pages/Home';
import Introduction from './pages/Introduction';
import GameStart from './pages/GameStart';
import DataInsight from './pages/DataInsight';
import DesignShow from './pages/DesignShow';
import CodeDesign from './pages/CodeDesign';
import Help from './pages/Help';
import './global.less';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/introduction" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="introduction" element={<Introduction />} />
          <Route path="game-start" element={<GameStart />} />
          <Route path="data-insight" element={<DataInsight />} />
          <Route path="design-show" element={<DesignShow />} />
          <Route path="code-design" element={<CodeDesign />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
