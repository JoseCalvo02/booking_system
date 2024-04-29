import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from '../../assets/logo.png';
import { getAllAppointments } from '../../../api/apptApi';

const PDFAppt = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allAppointments = await getAllAppointments();
                setAppointments(allAppointments);
                setLoading(false);
            }
            catch (error) {
                console.error('Error al cargar las citas:', error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    console.log(appointments);

    return (
        <Document>
            <Page size="letter" style={styles.page}>
                <Image src={Logo} style={styles.logo} />
                <Text style={styles.title}>Reporte de Citas</Text>

                {loading ? (
                    <Text>Cargando citas...</Text>
                ) : (
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>ID Cita</Text>
                            <Text style={styles.tableHeader}>Cliente</Text>
                            <Text style={styles.tableHeader}>Estilista</Text>
                            <Text style={styles.tableHeader}>Comentarios</Text>
                            <Text style={styles.tableHeader}>Estado</Text>
                        </View>
                        {appointments.map((appointment, index) => (
                            <View style={styles.tableRow} key={index}>
                                <Text style={styles.tableCell}>{appointment.citaID}</Text>
                                <Text style={styles.tableCell}>{appointment.nombreCliente}</Text>
                                <Text style={styles.tableCell}>{appointment.nombreEstilista}</Text>
                                <Text style={styles.tableCell}>{appointment.comentarios}</Text>
                                <Text style={styles.tableCell}>{appointment.estadoID}</Text>
                            </View>
                        ))}
                    </View>
                )}
                <View style={styles.reportDateContainer}>
                    <Text style={styles.reportDate}>Fecha de Reporte: {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                    <Text style={styles.reportDate}>Hora de Reporte: {new Date().toLocaleTimeString('es-ES')}</Text>
                </View>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 20,
        fontSize: 12,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        fontSize: 12,
    },
    tableRow: {
        flexDirection: 'row'
    },
    tableHeader: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 5,
    },
    tableCell: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        textAlign: 'center',
        padding: 5,
    },
    reportDateContainer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 10,
    },
    reportDate: {
        marginBottom: 5,
    },
});

export default PDFAppt;