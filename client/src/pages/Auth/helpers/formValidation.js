// Evaluate all the inputs of the Signup Form
export const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'El nombre es obligatorio';
    }
    if (!values.lastName) {
        errors.lastName = 'El apellido es obligatorio';
    }
    if (!values.phone) {
        errors.phone = 'El teléfono es obligatorio';
    } else if (!/^\d+$/.test(values.phone)) {
        errors.phone = 'El teléfono solo puede contener números';
    } else if (!/^\d{8}$/.test(values.phone)) {
        errors.phone = 'El teléfono debe contener exactamente 8 dígitos numéricos';
    }
    if (!values.email) {
        errors.email = 'El correo electrónico es obligatorio';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'El correo electrónico no es válido';
    }
    if (!values.password) {
        errors.password = 'La contraseña es obligatoria';
    } else if (values.password.length < 8) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Debe confirmar la contraseña';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return errors;
};

// Evaluate all the inputs of the Login Form
export const validateLoginForm = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'El correo electrónico es obligatorio';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'El correo electrónico no es válido';
    }
    if (!values.password) {
        errors.password = 'La contraseña es obligatoria';
    }

  return errors;
};