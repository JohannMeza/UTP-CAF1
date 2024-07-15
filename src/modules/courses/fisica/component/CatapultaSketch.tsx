// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const CatapultaSketch = (p: any): void => {
//   const baseX = 100;
//   const baseY = 500;
//   const armLength = 200;
//   const targetArmAngle = initialArmAngle;

//   p.setup = () => {
//     p.createCanvas(800, 600);
//     p.angleMode(p.DEGREES);
//   };

//   p.draw = () => {
//     p.background(220);

//     // Dibujar base
//     p.fill(139, 69, 19); // Color marrón para la madera
//     p.rect(baseX, baseY, 400, 20);

//     // Dibujar ruedas
//     p.fill(160, 82, 45); // Color marrón claro para las ruedas
//     p.ellipse(baseX + 50, baseY + 40, 80, 80);
//     p.ellipse(baseX + 350, baseY + 40, 80, 80);

//     // Dibujar eje central
//     p.fill(139, 69, 19);
//     p.rect(baseX + 195, baseY - 170, 10, 190);    

//     // Dibujar brazo de disparo
//     p.push();
//     p.translate(baseX + 200, baseY);
//     p.fill(139, 69, 19);
//     p.rotate(targetArmAngle);
//     p.rect(0, 0, armLength, 10);
//     p.pop();

//     //Dibujar contenedor de lanzamiento
//     const armEndX = baseX + 200 + armLength * Math.cos(p.radians(targetArmAngle));
//     const armEndY = baseY + armLength * Math.sin(p.radians(targetArmAngle));
//     p.push();
//     p.translate(armEndX, armEndY);
//     p.rotate(targetArmAngle);
//     p.arc(0, 0, 80, 80, 180, 0); // Semicírculo de radio 100
//     p.pop();

//     // Dibujar eje horizontales
//     p.push();
//     p.translate(baseX + 200, baseY - 150);
//     p.rotate(50);
//     p.rect(0, 0, armLength, 10);
//     p.rotate(80);
//     p.rect(10, -10, armLength, 10);
//     p.pop(); 

//     // Dibujar la pelota
//     p.fill(255, 0, 0); // Color rojo para la pelota
//     // p.ellipse(ball.x, ball.y, 20, 20); // Dibujar la pelota en su posición actual
//   };

//   // const animateArm = (): void => {
//   //   if (animating) {
//   //     const deltaAngle = 0.05;
//   //     if (Math.abs(targetArmAngle - targetArmAngle) > deltaAngle) {
//   //       setArmAngle(p.lerp(targetArmAngle, targetArmAngle, 0.1));
//   //     } else {
//   //       setArmAngle(targetArmAngle);
//   //       setAnimating(false);
//   //     }
//   //   }
//   // };

//   p.keyPressed = () => {
//     if (p.key === ' ') {
//       // Actualizar el ángulo del brazo y el contenedor
//       // setArmAngle(armAngle - 10); // Cambiar el ángulo del brazo
//       // setContainerAngle(containerAngle - 10); // Cambiar el ángulo del contenedor

//       // Lanzar la pelota
//       // setBall({
//       //   x: baseX + 200 + armLength * Math.cos(p.radians(armAngle)),
//       //   y: baseY + armLength * Math.sin(p.radians(armAngle)),
//       //   vx: 10 * Math.cos(p.radians(armAngle)),
//       //   vy: 10 * Math.sin(p.radians(armAngle))
//       // });
//     }
//   };

//   const catapultRef = useRef<HTMLDivElement>(null);
//   const [containerAngle, setContainerAngle] = useState(150); // Estado para el ángulo del contenedor

//   const [armAngle, setArmAngle] = useState(initialArmAngle); // Estado para el ángulo actual del brazo
//   const [animating, setAnimating] = useState(false); // Estado para la animación

//   // Agregamos un estado para la pelota
//   const [ball, setBall] = useState({ x: 0, y: 0, vx: 0, vy: 0 });

//   useEffect(() => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const p5Instance = catapultRef.current && new p5(sketch, catapultRef.current);
//     p5Instance?.remove();
//     return () => {};
//   }, []);
// };
