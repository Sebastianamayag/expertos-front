import React, { useEffect, useState } from 'react'
import ApiBD from './api/ApiBD';

function App() {
  const [peso, setPeso] = useState(0);
  const [altura, setAltura] = useState(0);
  const [calc, setCalc] = useState(0);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState(0);
  const [body, setBody] = useState('');
  const [cuerpos, setCuerpos] = useState([]);
  const [nivel, setNivel] = useState('');
  const [goal, setGoal] = useState('');
  const [rutinas, setRutinas] = useState([]);
  const handleCalc=async(e)=>{
    e.preventDefault();
    setCalc(peso/(altura*altura));
    const data=await ApiBD.post('create',{talla:altura,peso,nombre,apellidos:apellido,edad});
    console.log(data);
  }
  useEffect(() => {
    traerData()
  }, []);
  const traerData=async()=>{
    const data=await ApiBD.get('tipo');
    setCuerpos(data.data.tipoCuerpo)
  }

  const obtenerRutina=async(e)=>{
    e.preventDefault();
    const datas=await ApiBD.post('/rutina/create',{goal,cuerpo:body,nivel,peso,edad});
    setRutinas(datas.data.rutinas);
    console.log(datas);
  }
  return (
    <div style={{height:window.innerHeight,backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/000/688/300/non_2x/young-men-exercising-in-park-vector.jpg")`,backgroundSize:'cover'}} >
      <h1 style={{textAlign:'center'}} >Sistema Experto de Rutinas</h1>
      <h2 style={{textAlign:'center'}} >¡Bienvenido!</h2>
      {
        calc===0?
        (
          <>
          <h2 style={{textAlign:'center'}} >Empezaremos por calcular tu indice de masa corporal</h2>
            <form style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
              <div style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}} >
                <p>Nombres:</p>
                <input 
                  type="text"
                  placeholder="Nombres"
                  style={{backgroundColor:'transparent',width:'5%',borderTop:'none',borderRight:'none',borderLeft:'none',textAlign:'center'}}
                  onChange={(e)=>setNombre(e.target.value)}
                />
              </div>
              <div style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}} >
                <p>Apellidos:</p>
                <input 
                  type="text"
                  placeholder="Apellidos"
                  style={{backgroundColor:'transparent',width:'5%',borderTop:'none',borderRight:'none',borderLeft:'none',textAlign:'center'}}
                  onChange={(e)=>setApellido(e.target.value)}
                />
              </div>
              <div style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}} >
                <p>Edad:</p>
                <input 
                  type="number"
                  placeholder="(age)"
                  style={{backgroundColor:'transparent',width:'5%',borderTop:'none',borderRight:'none',borderLeft:'none',textAlign:'center'}}
                  onChange={(e)=>setEdad(e.target.value)}
                />
              </div>
              <div style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}} >
                <p>Peso:</p>
                <input 
                  type="number"
                  placeholder="(Kg)"
                  style={{backgroundColor:'transparent',width:'5%',borderTop:'none',borderRight:'none',borderLeft:'none',textAlign:'center'}}
                  onChange={(e)=>setPeso(e.target.value)}
                />
              </div>
              <div style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}} >
                <p>Altura:</p>
                <input 
                  type="number"
                  placeholder="(mts)"
                  style={{backgroundColor:'transparent',width:'5%',borderTop:'none',borderRight:'none',borderLeft:'none',textAlign:'center'}}
                  onChange={(e)=>setAltura(e.target.value)}
                />
              </div>
              <button
                style={{cursor:'pointer',border:'none',backgroundColor:'black',color:'white',fontSize:18,padding:10}}
                onClick={handleCalc}
              >Calcular</button>
            </form>
          </>
        ):
        (
          <>
            <h2 style={{textAlign:'center'}} >Tu indice de masa corporal es de: {calc}</h2>
            {
              body===''?
              (
                <>
                  <h2 style={{textAlign:'center'}} >Ahora elige tu tipo de cuerpo</h2>
                  <div style={{display:'flex',justifyContent:'space-around'}} >
                    {
                      cuerpos.map((cuerpo,key)=>(
                        <button key={key} style={{cursor:'pointer',border:'none',backgroundColor:'black',color:'white',fontSize:18,padding:10}} onClick={(e)=>{e.preventDefault();setBody(cuerpo.id)}} >{cuerpo.tipo}</button>
                      ))
                    }
                  </div>
                </>
              ):
              (
                <>
                  {
                    goal===''?
                    (
                      <>
                        <h2 style={{textAlign:'center'}} >Ahora elige que objetivo tienes</h2>
                        <div style={{display:'flex',justifyContent:'space-around'}} >
                          <button onClick={(e)=>{e.preventDefault();setGoal('Bajar')}} style={{cursor:'pointer',border:'none',backgroundColor:'black',color:'white',fontSize:18,padding:10}} >Bajar peso</button>
                          <button onClick={(e)=>{e.preventDefault();setGoal('Subir')}} style={{cursor:'pointer',border:'none',backgroundColor:'black',color:'white',fontSize:18,padding:10}} >Subir peso</button>
                          <button onClick={(e)=>{e.preventDefault();setGoal('Definir')}} style={{cursor:'pointer',border:'none',backgroundColor:'black',color:'white',fontSize:18,padding:10}} >Definir</button>
                        </div>
                      </>
                    )
                    :
                    (
                      <>
                        {
                          rutinas.length===0?
                          (
                            <>
                              <h2 style={{textAlign:'center'}} >Ahora elige el nivel de entrenamiento que tienes</h2>
                              <div style={{display:'flex',justifyContent:'space-around'}} >
                                <button onClick={(e)=>{e.preventDefault();setNivel('Bajo')}} style={{cursor:'pointer',border:'none',backgroundColor:'black',color:'white',fontSize:18,padding:10}} >Bajo</button>
                                <button onClick={(e)=>{e.preventDefault();setNivel('Medio')}} style={{cursor:'pointer',border:'none',backgroundColor:'black',color:'white',fontSize:18,padding:10}} >Medio</button>
                                <button onClick={(e)=>{e.preventDefault();setNivel('Alto')}} style={{cursor:'pointer',border:'none',backgroundColor:'black',color:'white',fontSize:18,padding:10}} >Alto</button>
                              </div>
                              <div style={{display:'flex',alignItems:'center',justifyContent:'center'}} >
                                <button
                                  style={{marginTop:160,cursor:'pointer',border:'none',backgroundColor:'black',color:'white',fontSize:18,padding:10}}
                                  onClick={obtenerRutina}
                                >Obtener Rutina</button>
                              </div>

                            </>
                          ):
                          (
                            <>
                              {
                                rutinas.map((rut,key)=>{
                                  if(rut.Nivel===nivel){
                                    return(
                                      <div key={key} style={{backgroundColor:'white',padding:20,marginBottom:10}} >
                                        <h2 style={{textAlign:'center'}} >Esta Es la rutina más recomendada</h2>
                                        <p style={{marginLeft:10,marginRight:10}} >{rut.Ejercicios}</p>
                                      </div>
                                    )
                                  }else{
                                    return(
                                      <div key={key} style={{backgroundColor:'white',padding:20,marginBottom:10}} >
                                        <h2 style={{textAlign:'center'}} >Estas rutinas opcionales</h2>
                                        <p style={{marginLeft:10,marginRight:10}} >{rut.Ejercicios}</p>
                                      </div>
                                    )
                                  }
                                })
                              }
                            </>
                          )
                        }
                      </>
                    )
                  }
                </>
              )
            }
          </>
        )
      }
    </div>
  );
}

export default App;
