import { CoursesRouter } from '@src/modules/courses/courses-router';
import { FC, PropsWithChildren } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const IndexRouter: FC<PropsWithChildren> = () => (
  <Router>
    <Routes>
      <Route path="/*" element={<CoursesRouter />} />
      <Route path="/courses/*" element={<CoursesRouter />} />
      <Route path="*" element={<>404</>} />
    </Routes>
  </Router>
);
