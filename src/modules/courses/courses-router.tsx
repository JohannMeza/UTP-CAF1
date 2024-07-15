import { FC, PropsWithChildren } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FisicaView } from './fisica/FisicaView';
import { CoursesView } from './CoursesView';

export const CoursesRouter: FC<PropsWithChildren> = () => (
  <Routes>
    <Route path="" element={<CoursesView />} />
    <Route path="/fisica" element={<FisicaView />} />
    <Route path="*" element={<>404</>} />
  </Routes>
);
