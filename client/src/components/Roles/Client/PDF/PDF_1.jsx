import {
    Document,
    Text,
    Page,
} from '@react-pdf/renderer';
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';


function PDF_1() {

const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    telefono: '',
}); // Define el estado local para almacenar el nombre de usuario

useEffect(() => {
    // Obtiene el token de acceso del almacenamiento local
    const token = localStorage.getItem('token');
    // Decodifica el token para obtener la información del usuario
    const decodedToken = jwtDecode(token);
    // Establece el estado local con la información del usuario
    setUserData({
        nombre: decodedToken.name,
        correo: decodedToken.email,
        direccion: decodedToken.address,
        telefono: decodedToken.phone
    });
}
, []); // Ejecuta el efect efecto solo una vez
    
    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.header}>Reporte PDF 1</Text>
                <Text style={styles.sectionTitle}>Información personal</Text>
                <table style={styles.table}>
                    <Text>
                        <tr style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Información Personal</Text>
                        </tr>
                    </Text>
                    <tbody>
                        <tr style={styles.tableRow}>
                            <Text style={styles.tableData}>Nombre Usuario</Text>
                            <Text style={styles.tableData}>{userData.nombre}</Text>
                        </tr>
                        <tr style={styles.tableRow}>
                            <Text style={styles.tableData}>Correo Electrónico</Text>
                            <Text style={styles.tableData}>{userData.correo}</Text>
                        </tr>
                        <tr style={styles.tableRow}>
                            <Text style={styles.tableData}>Dirección</Text>
                            <Text style={styles.tableData}>{userData.direccion}</Text>
                        </tr>
                        <tr style={styles.tableRow}>
                            <Text style={styles.tableData}>Teléfono</Text>
                            <Text style={styles.tableData}>{userData.telefono}</Text>
                        </tr>
                    </tbody>
                </table>
            </Page>
        </Document>
    );
}

const styles = {
    page: {
        padding: 20,
        textAlign: 'center',
    },
    header: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    table: {
        width: '100%',
        border: '1px solid #000',
        borderCollapse: 'collapse',
    },
    tableRow: {
        borderBottom: '1px solid #000',
        fontSize: 12,
    },
    tableHeader: {
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableData: {
        padding: 10,
        textAlign: 'center',
    },
};

export default PDF_1;
