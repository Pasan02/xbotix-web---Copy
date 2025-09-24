import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Route } from "react-router";
import { BRAND_COLORS } from "./constants/brandConstants";
import {
  Home,
  NewBackgroundPage,
  FotorBackgroundPage,
  CombinedStoryPage,
  EmoRobotPage,
  EmoFotorCombinedPage,
  GuardianSurvivesEmo,
  GuardianToEmoFlow,
} from "./pages";
const App = () => {
  return (
    <div style={{ backgroundColor: BRAND_COLORS.BLACK, minHeight: '100vh', width: '100%' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emo-fotor-combined" element={<EmoFotorCombinedPage />} />
          <Route path="/combined-story" element={<CombinedStoryPage />} />
          <Route path="/fotor-background" element={<FotorBackgroundPage />} />
          <Route path="/new-background" element={<NewBackgroundPage />} />
          <Route path="/emo-robot" element={<EmoRobotPage />} />
  
          <Route path="/guardian-survives-emo" element={<GuardianSurvivesEmo />} />
          <Route path="/guardian-to-emo-flow" element={<GuardianToEmoFlow />} />  
        </Routes>
      </Router>
    </div>
  );
};

export default App;
