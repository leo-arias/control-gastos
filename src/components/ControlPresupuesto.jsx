import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({
    gastos, 
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        // Calcular gastado
        const totalGastado = gastos.reduce((total, gasto) => total + gasto.cantidad, 0)

        // Calcular disponible
        const totalDisponible = presupuesto - totalGastado

        // Calcular porcentaje
        const porcentajeGastado = ((totalGastado / presupuesto) * 100).toFixed(2)

        
        setDisponible(totalDisponible)
        setGastado(totalGastado)

        setTimeout(() => {
            setPorcentaje(porcentajeGastado)
        }, 1000)
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(cantidad)
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Estás seguro que deseas reiniciar presupuesto y gastos?')

        if(resultado) {
            setPresupuesto(0)
            setGastos([])
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
                value={porcentaje}
                styles={buildStyles({
                    textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                    pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                    trailColor: '#f3f3f3'
                })}
                text={`${porcentaje}% Gastado`}
            />
        </div>

        <div className="contenido-presupuesto">
            <button className="reset-app" type="button" onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}

            </p>

            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto