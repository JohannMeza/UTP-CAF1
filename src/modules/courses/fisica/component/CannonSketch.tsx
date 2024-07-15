import { FC, PropsWithChildren, Suspense, useEffect, useRef } from 'react';
import p5 from 'p5';

export const CatapultView: FC<PropsWithChildren> = () => {
  const catapultRef = useRef<HTMLDivElement>(null);
  let targetArmAngle = -135;
  // const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sketch = (p: any): void => {
      const baseX = 100;
      const baseY = 500;
      const armLength = 200;

      let armAngle = -135; // Ángulo inicial del brazo
      let ball = { x: 0, y: 0, vx: 0, vy: 0 };

      p.setup = () => {
        p.createCanvas(800, 600);
        p.angleMode(p.DEGREES);

        ball = {
          x: baseX + 200 + armLength * Math.cos(p.radians(targetArmAngle)),
          y: baseY + armLength * Math.sin(p.radians(targetArmAngle)),
          vx: 0,
          vy: 0
        };
      };

      p.draw = () => {
        p.background(220);

        p.background(220);

        // Dibujar base
        p.fill(139, 69, 19); // Color marrón para la madera
        p.rect(baseX, baseY, 400, 20);
    
        // Dibujar ruedas
        p.fill(160, 82, 45); // Color marrón claro para las ruedas
        p.ellipse(baseX + 50, baseY + 40, 80, 80);
        p.ellipse(baseX + 350, baseY + 40, 80, 80);
    
        // Dibujar eje central
        p.fill(139, 69, 19);
        p.rect(baseX + 195, baseY - 170, 10, 190);    
    
        // Dibujar brazo de disparo
        armAngle += (targetArmAngle - armAngle) * 0.1;    
        p.push();
        p.translate(baseX + 200, baseY);
        p.fill(139, 69, 19);
        p.rotate(armAngle);
        p.rect(0, 0, armLength, 10);
        p.pop();
    
        //Dibujar contenedor de lanzamiento
        const armEndX = baseX + 200 + armLength * Math.cos(p.radians(targetArmAngle));
        const armEndY = baseY + armLength * Math.sin(p.radians(targetArmAngle));
        p.push();
        p.translate(armEndX, armEndY);
        p.rotate(targetArmAngle);
        p.arc(0, 10, 80, 80, 180, 0); // Semicírculo de radio 100 
        p.pop();
    
        // Dibujar eje horizontales
        p.push();
        p.translate(baseX + 200, baseY - 150);
        p.rotate(50);
        p.rect(0, 0, armLength, 10);
        p.rotate(80);
        p.rect(10, -10, armLength, 10);
        p.pop(); 
    
        // Dibujar la pelota
        // p.ellipse(ball.x, ball.y, 20, 20); // Dibujar la pelota en su posición actual
        // Dibujar la pelota
        p.fill(255, 0, 0); // Color rojo para la pelota
        p.ellipse(ball.x, ball.y, 20, 20); // Dibujar la pelota en su posición actual

        // Actualizar la posición de la pelota
        // ball = {
        //   x: baseX + 200 + armLength * Math.cos(p.radians(targetArmAngle)),
        //   y: baseY + armLength * Math.sin(p.radians(targetArmAngle)),
        //   vx: 0,
        //   vy: 0
        // };

        ball = {
          x: ball.x + ball.vx,
          y: ball.y + ball.vy,
          vx: ball.vx,
          vy: ball.vy + 0.4 // Añadir gravedad
        };

        
      };

      p.keyPressed = () => {
        if (p.key === ' ') {
          // Lanzar la pelota
          ball = {
            x: baseX + 200 + armLength * Math.cos(p.radians(targetArmAngle)),
            y: baseY + armLength * Math.sin(p.radians(targetArmAngle)),
            vx: 10 * Math.cos(p.radians(armAngle)),
            vy: 10 * Math.sin(p.radians(armAngle))
          };

          // setIsAnimate(true);
          // Animar el brazo de la catapulta
          // armAngle = -30;
          // eslint-disable-next-line react-hooks/exhaustive-deps
          targetArmAngle = -30;
        }
      };
    };

    const p5Instance = catapultRef.current && new p5(sketch, catapultRef.current);

    return () => {
      p5Instance?.remove();
    };
  }, [targetArmAngle]);
  
  return (
    <Suspense>
      <div ref={catapultRef}></div>
    </Suspense>
  );
};

export default CatapultView;