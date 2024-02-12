import React from 'react';
import { useForm } from "react-hook-form";
import { edadValidator } from "./validator";

const Formulario = () => {
    const { register, formState: { errors }, watch, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    const incluirTelefono = watch('incluirTelefono');

    return <div>
        <h2>Formulario</h2>
        <p>Nombre: {watch('nombre')}</p>
        <form onSubmit={handleSubmit(onSubmit)}> 
            <div>
                <label>Nombre</label>
                <input type="text" {...register('nombre', {
                required: true,
                maxLength: 10
            })}/>
                {errors.nombre?.type === 'required' && <p>El campo nombre es requerido</p>}
                {errors.nombre?.type === 'maxLength' && <p>El campo nombre debe tener menos de 10 caracteres</p>}

            </div>
            <div>
                <label>Apellidos</label>
                <input type="text" {...register('apellidos', {
                required: true,
})}/>
            </div>
            <div>
                <label>Email</label>
                <input type="text" {...register('email', {
                    pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
                })} />
                {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}
            </div>
            <div>
                <label>Edad</label>
                <input type="text" {...register('edad', {
                    validate: edadValidator,
            })}/>
                {errors.edad && <p>La edad debe estar entre 18 y 65 años</p>}
            </div>
            <div>
                <label>País</label>
                <select {...register('país')}>
                    <option value="es">España</option>
                    <option value="po">Portugal</option>
                    <option value="it">Italia</option>
                </select>
            </div>

            <div>
                <label>¿Incluir teléfono?</label>
                <input type="checkbox" {...register('incluirTelefono')} />
            </div>
            {incluirTelefono && (
            <div>
            <label>Teléfono</label>
            <input type="text" {...register('telefono')} />
            </div>
            )}
            
            <input type="submit" value="Enviar"/>
        </form>

    </div>
}

export default Formulario;