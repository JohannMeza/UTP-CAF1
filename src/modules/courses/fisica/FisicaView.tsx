/* eslint-disable jsx-a11y/no-autofocus */
import { Box, Button, Grid, InputBase, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import { ChangeEvent, FC, PropsWithChildren, useState } from 'react';
import { SketchExample } from './component/Sketch';
import { AccordionComponent, AccordionDetailsSecondary, AccordionSumarySecondary } from '../courses-styles';
import { convertMsToTime, cosRad, sinRad } from './fisica-functions';
import { ModalConfig } from './component/ModalConfig';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface DataConfig {
  angulo: number
  gravedad: number
  altura: number
  distancia: number
  tiempo: number
}

interface DatosProps extends DataConfig {
  lanzamiento: string
  distancia: number
  tiempo: number
}

interface DatosResultados {
  velocidad: number
  tiempo: number
  alturaMax: number
}

export const dataInitial = {
  angulo: 45,
  gravedad: 9.81,
  altura: 0.3,
  distancia: 0,
  tiempo: 0,
};

const dataResultado = {
  velocidad: 0,
  tiempo: 0,
  alturaMax: 0,
};

const CustomTabPanel = (props: TabPanelProps): React.ReactNode => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};


export const FisicaView: FC<PropsWithChildren> = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [timeOut, setTimeOut] = useState<NodeJS.Timeout>();
  const [tab, setTab] = useState(1);
  const [time, setTime] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [datos, setDatos] = useState<DatosProps[]>([]);
  const [dataConfig, setDataConfig] = useState<DataConfig>(dataInitial);
  const [dataPromedio, setDataPromedio] = useState<DataConfig>(dataInitial);
  const [dataResultados, setDataResultados] = useState<DatosResultados>(dataResultado);

  const [dataCalculos, setDataCalculos] = useState({
    calc_1: [
      ['', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    calc_2: [
      '',
      '',
      '',
      '',
    ],
  });

  const resetearData = (): void => {
    setDataConfig(dataInitial);
  };

  const calcularResultados = (data = datos): DatosProps => {
    const cant = data.length;
    let distancia = 0;
    let tiempo = 0;

    data.forEach((el) => {
      distancia += parseFloat(el.distancia.toString());
      tiempo += el.tiempo;
    });

    return {
      lanzamiento: 'Promedio',
      distancia: parseFloat((distancia / cant).toFixed(2)),
      tiempo: parseFloat((tiempo / cant).toFixed(2)),
      angulo: dataConfig.angulo,
      gravedad: dataConfig.gravedad,
      altura: dataConfig.altura
    };
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number): void => setTab(newValue);

  const handleClickConfig = (): void => {
    setOpenModal(true);
  };

  const handleClickStart = (): void => {
    let iniTime = 0;
    const timeoutId = setInterval(() => {
      iniTime += 10;
      setTime(iniTime);
    }, 10);

    setTimeOut(timeoutId);
    setStep(2);
  };

  const handleClickStop = (): void => {
    clearInterval(timeOut);
    setStep(3);
  };

  const handleClickDrop = (): void => {
    setTime(0);
    setStep(1);
    resetearData();
  };

  const handleClickSave = (): void => {
    const data = [
      ...datos, 
      {
        ...dataConfig,
        lanzamiento: (datos.length + 1).toString(),
        distancia: dataConfig.distancia,
        tiempo: time,
      }
    ];

    setStep(4);
    setDatos(data);

    const calculo = calcularResultados(data);

    setDataPromedio({
      altura: dataConfig.altura,
      angulo: dataConfig.angulo,
      distancia: calculo.distancia,
      gravedad: dataConfig.gravedad,
      tiempo: calculo.tiempo,
    });
  };

  const handleClickAdd = (): void => {
    setTime(0);
    setStep(1);
    resetearData();
  };

  const handleClickCalc = (): void => {
    setTime(0);
    setStep(5);
    resetearData();

    const calculo = calcularResultados();

    setDataPromedio({
      altura: dataConfig.altura,
      angulo: dataConfig.angulo,
      distancia: calculo.distancia,
      gravedad: dataConfig.gravedad,
      tiempo: calculo.tiempo / 1000,
    });

    const velocidad = parseFloat((calculo.distancia / (cosRad(dataConfig.angulo) * (calculo.tiempo / 1000))).toFixed(2));
    const tiempo = parseFloat(((velocidad * sinRad(dataConfig.angulo)) / dataConfig.gravedad).toFixed(2));
    const alturaMax = parseFloat((
      (dataConfig.gravedad / 2) * Math.pow((calculo.tiempo / 1000), 2)
    ).toFixed(2));

    setDataResultados({ alturaMax, tiempo, velocidad });

    setDataCalculos({
      calc_1: [
        ['Vx = V0 * cos(θ)', `Vx = V0 * cos(${dataConfig.angulo})`],
        ['x = X0 + Vx * t', `x = 0 + V0.cos(${dataConfig.angulo}) * (${calculo.tiempo / 1000})`, `${calculo.distancia} = 0 + V0.cos(${dataConfig.angulo}) * (${calculo.tiempo / 1000})`, `V0 = ${velocidad} m/s`],
        ['Hmax = (g / 2) * t ^ 2', `Hmax = (${dataConfig.gravedad} / 2) * ${calculo.tiempo} ^ 2`, `Hmax = ${alturaMax}`],
      ],
      calc_2: [
        'y = Y0 + Voy.t - (1 / 2) * g * t ^ 2',
        `ymax = ${dataConfig.altura} + V0 * sen(${dataConfig.angulo}) * (${tiempo}) - (1 / 2) * (${dataConfig.gravedad}) * (${tiempo}) ^ 2`,
        `ymax = ${dataConfig.altura} + ${velocidad} * sen(${dataConfig.angulo}) * (${tiempo}) - (1 / 2) * (${dataConfig.gravedad}) * (${tiempo}) ^ 2`,
        `ymax = ${alturaMax} m`,
      ],
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    // const dataValue = 
    setDataConfig((val) => ({
      ...val,
      [name]: value
    }));
  };

  return (
    <Box p={3}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button 
          variant='text'
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Regresar
        </Button>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value={1} label="Calculo" />
          <Tab value={2} label="Preview" />
        </Tabs>
      </Stack>

      {
        step !== 5 &&
        <CustomTabPanel value={tab} index={1}>
          <Grid container justifyContent={'center'} spacing={2}>
            <Grid item xs={8}>
              <Box sx={(theme) => ({
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  borderRadius: '8px',
                  padding: 2
              })}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  Inicio
                  {
                    step === 1 && 
                    <Stack direction={'row'} gap={2}>
                      <Button variant='contained' color='secondary' onClick={handleClickConfig}>Configurar</Button>
                      <Button variant='contained' color='secondary' onClick={handleClickStart}>Iniciar</Button>
                    </Stack>
                  }
                  {step === 2 && <Button variant='contained' color='secondary' onClick={handleClickStop}>Detener</Button>}
                  {
                    step === 3 && 
                    <Stack direction={'row'} gap={2}>
                      <Button variant='contained' color='secondary' onClick={handleClickDrop}>Borrar</Button>
                      <Button variant='contained' color='secondary' onClick={handleClickSave}>Guardar</Button>
                    </Stack>
                  }
                  {
                    step === 4 && 
                    <Stack direction={'row'} gap={2}>
                      <Button variant='contained' color='secondary' onClick={handleClickAdd}>Agregar</Button>
                      <Button variant='contained' color='secondary' onClick={handleClickCalc}>Calcular</Button>
                    </Stack>
                  }
                </Stack>

                <Grid container my={4}>
                  <Grid item xs={step !== 3 ? 12 : 8}>
                    <Stack direction={'row'} justifyContent={'center'}>
                      <Typography component={'span'} variant='h3'>{ convertMsToTime(time) }</Typography>
                    </Stack>
                  </Grid>
                  {
                    step === 3 &&
                    <Grid item xs={4} alignContent={'center'}>
                      <InputBase 
                        autoFocus 
                        variant='primary' 
                        placeholder='Ditancia' 
                        value={dataConfig.distancia} 
                        onChange={handleChange}
                        name='distancia' 
                        type='number'
                      />
                    </Grid>
                  }
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={8}>
              <AccordionComponent defaultExpanded>
                <AccordionSumarySecondary
                  expandIcon={<ExpandMoreIcon color='secondary' />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Resultados
                </AccordionSumarySecondary>
                <AccordionDetailsSecondary>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Lanzamiento</TableCell>
                          <TableCell align="center">Distancia</TableCell>
                          <TableCell align="center">Tiempo</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {datos.map((row) => (
                          <TableRow
                            key={row.lanzamiento}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="center">{row.lanzamiento}</TableCell>
                            <TableCell align="center">{row.distancia}</TableCell>
                            <TableCell align="center">{convertMsToTime(row.tiempo)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center">Promedio</TableCell>
                          <TableCell align="center">{dataPromedio.distancia}</TableCell>
                          <TableCell align="center">{convertMsToTime(dataPromedio.tiempo)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Stack direction={'row'} justifyContent={'center'}>
                    <Box component={'h2'}>
                      <span>X</span> = 
                      <sup>1</sup>&frasl;<sub>n</sub> 
                      &sum;<sub>i=1</sub><sup>n</sup> x<sub>i</sub>
                    </Box>
                  </Stack>
                </AccordionDetailsSecondary>
              </AccordionComponent>
            </Grid>
          </Grid>
        </CustomTabPanel>
      }

      {
        step === 5 &&
        <CustomTabPanel value={tab} index={1}>
          <Grid container justifyContent={'center'} spacing={2}>
            <Grid item xs={8}>
              <AccordionComponent defaultExpanded>
                <AccordionSumarySecondary
                  expandIcon={<ExpandMoreIcon color='secondary' />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Datos
                </AccordionSumarySecondary>
                <AccordionDetailsSecondary>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell align="center"><b>Ángulo (θ)</b></TableCell>
                          <TableCell align="center">{ dataPromedio.angulo }</TableCell>
                          <TableCell align="center">grados</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center"><b>Distancia(x)</b></TableCell>
                          <TableCell align="center">{ dataPromedio.distancia }</TableCell>
                          <TableCell align="center">metros</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center"><b>Tvuelo</b></TableCell>
                          <TableCell align="center">{ dataPromedio.tiempo }</TableCell>
                          <TableCell align="center">segundos</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center"><b>Gravedad(g)</b></TableCell>
                          <TableCell align="center">{ dataPromedio.gravedad }</TableCell>
                          <TableCell align="center">m/s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center"><b>Altura(Yo)</b></TableCell>
                          <TableCell align="center">{ dataPromedio.altura }</TableCell>
                          <TableCell align="center">metros</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetailsSecondary>
              </AccordionComponent>
            </Grid>

            <Grid item xs={8}>
              <AccordionComponent defaultExpanded>
                <AccordionSumarySecondary
                  expandIcon={<ExpandMoreIcon color='secondary' />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Cálculos
                </AccordionSumarySecondary>
                <AccordionDetailsSecondary>

                  <Box
                    sx={() => ({
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: 3
                    })}
                  >
                    {
                      dataCalculos.calc_1.map((calc, indexArr) => (
                        <Box 
                          key={indexArr}
                          sx={(theme) => ({
                            padding: 2,
                            color: theme.palette.primary.main,
                            background: theme.palette.primary.contrastText,
                            borderRadius: 1,
                            gap: 1
                          })}
                        >
                          {
                            calc.map((el, indexCalc) => (
                              <Box 
                                key={indexCalc}
                                sx={() => ({
                                  paddingY: 1
                                })}
                              >{el}</Box>
                            ))
                          }
                        </Box>
                      ))
                    }
                  </Box>
                  <br />
                  <Box
                    sx={(theme) => ({
                      padding: 2,
                      color: theme.palette.primary.main,
                      background: theme.palette.primary.contrastText,
                      borderRadius: 1,
                      textAlign: 'center',
                      gap: 1
                    })}
                  >
                    {
                      dataCalculos.calc_2.map((calc, indexArr) => (
                        <Box 
                          key={indexArr}
                          sx={() => ({
                            padding: 2,
                          })}
                        >{calc}</Box>
                      ))
                    }
                  </Box>
                </AccordionDetailsSecondary>
              </AccordionComponent>
            </Grid>

            <Grid item xs={8}>
              <AccordionComponent defaultExpanded>
                <AccordionSumarySecondary
                  expandIcon={<ExpandMoreIcon color='secondary' />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Resultados Finales
                </AccordionSumarySecondary>
                <AccordionDetailsSecondary>
                  <Box 
                    sx={(theme) => ({
                      width: 'auto',
                      maxWidth: 'max-content',
                      margin: '0 auto',
                      padding: '15px 25px',
                      background: theme.palette.primary.contrastText,
                      color: theme.palette.primary.main,
                      borderRadius: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    })}
                  >
                    <Box><b>Vo = {dataResultados.velocidad} m/s</b></Box>
                    <Box><b>t = {dataResultados.tiempo} s</b></Box>
                    <Box><b>ymax = {dataResultados.alturaMax} m</b></Box>
                  </Box>
                </AccordionDetailsSecondary>
              </AccordionComponent>
            </Grid>
          </Grid>
        </CustomTabPanel>
      }

      <CustomTabPanel value={tab} index={2}>
        <Grid container justifyContent={'center'} spacing={2}>
          <Grid item xs={8}>
            {/* <div ref={catapultRef}></div> */}
            {/* <CanonView /> */}
            <SketchExample />
          </Grid>
        </Grid>
      </CustomTabPanel>

      <ModalConfig open={openModal} setOpen={setOpenModal} title={'Configurar datos'} data={dataConfig} setData={setDataConfig} />
    </Box>
  );
};
