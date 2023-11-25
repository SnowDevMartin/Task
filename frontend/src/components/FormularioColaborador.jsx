import { useState, useEffect } from 'react';
import useProyectos from '../hooks/useProyectos';
import { useParams } from 'react-router-dom';

const FormularioColaborador = () => {
	const [email, setEmail] = useState('');
	const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');

	const { mostrarAlerta, submitColaborador, proyectos } = useProyectos();

	const params = useParams();

	useEffect(() => {
		setProyectoSeleccionado('');
		const proyectoAsociado = proyectos.find(
			proyecto => proyecto._id === params.id
		);
		if (proyectoAsociado) {
			setProyectoSeleccionado(proyectoAsociado._id);
		}
	}, [params.id, proyectos]);

	const handleSubmit = e => {
		e.preventDefault();
		if (
			email === '' ||
			!email.includes('@') ||
			!email.includes('.') ||
			email.length < 5
		) {
			mostrarAlerta({
				error: 'error',
				msg: 'Debes introducir un email válido',
			});

			return;
		}

		submitColaborador(email);
		console.log('Buscando colaborador...');
	};

	return (
		<form
			className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow block'
			onSubmit={handleSubmit}
		>
			<div className='mb-5'>
				<label
					htmlFor='email'
					className='text-gray-700 uppercase font-bold text-sm'
				>
					Buscar por email
				</label>
				<input
					type='email'
					id='email'
					name='email'
					placeholder='Email del colaborador'
					className='w-full border border-gray-400 px-4 py-2 my-2 rounded-lg focus:outline-none focus:border-blue-500'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<label
					htmlFor='email'
					className='text-gray-700 uppercase font-bold text-sm'
				>
					Proyecto asociado
				</label>

				<select
					className='w-full border border-gray-400 px-4 py-2 mt-2 rounded-lg focus:outline-none focus:border-blue-500'
					value={proyectoSeleccionado}
					onChange={e => setProyectoSeleccionado(e.target.value)}
					disabled={proyectoSeleccionado == params.id}
				>
					{proyectoSeleccionado === params.id ? (
						<option
							key={proyectoSeleccionado}
							value={proyectoSeleccionado}
						>
							{
								proyectos.find(
									proyecto =>
										proyecto._id === proyectoSeleccionado
								).nombre
							}
						</option>
					) : (
						<>
							<option value=''>Selecciona un proyecto</option>
							{proyectos.map(proyecto => (
								<option key={proyecto._id} value={proyecto._id}>
									{proyecto.nombre}
								</option>
							))}
						</>
					)}
				</select>

				<input
					type='submit'
					className='bg-slate-800 hover:bg-slate-900 mt-4 w-full p-3 rounded text-white uppercase font-bold cursor-pointer transition-colors'
					value={'Buscar Colaborador'}
				/>
			</div>
		</form>
	);
};

export default FormularioColaborador;
