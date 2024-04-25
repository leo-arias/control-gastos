import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({
  presupuesto, 
  setPresupuesto,
  setIsValidPresupuesto
}) => {

  const [mensaje, setMensaje] = useState('')

  const handlePresupuesto = (e) => {
    e.preventDefault()

    // Validar
    if(!presupuesto || presupuesto < 0) {
      setMensaje('El presupuesto es incorrecto')
      return
    }

    // Si se pasa la validación
    setMensaje('')
    setIsValidPresupuesto(true)
    
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form className='formulario' onSubmit={handlePresupuesto}>
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>

                <input
                    type="number"
                    className="nuevo-presupuesto"
                    placeholder="Añade tu presupuesto"
                    value={presupuesto}
                    onChange={ (e) => setPresupuesto(e.target.value)}
                />
            </div>

            <input type='submit' value='Añadir'/>

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto