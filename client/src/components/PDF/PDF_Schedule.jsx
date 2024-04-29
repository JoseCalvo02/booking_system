import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from '../../assets/logo.png';
import { getAllSchedules } from '../../../api/scheduleApi';

const PDFSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSchedules();
    }, []);

    const loadSchedules = async () => {
        try {
            const allSchedules = await getAllSchedules();
            const currentMonthSchedules = filterCurrentMonthSchedules(allSchedules);
            setSchedules(currentMonthSchedules);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar los horarios:', error);
            setLoading(false);
        }
    }

    const filterCurrentMonthSchedules = (allSchedules) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // getMonth() devuelve 0 para enero, por lo que se agrega 1
        const currentMonthSchedules = allSchedules.filter(schedule => {
            const scheduleDate = new Date(schedule.fecha);
            const scheduleMonth = scheduleDate.getMonth() + 1;
            return scheduleMonth === currentMonth;
        });

        // Ordenar los horarios por fecha de menor a mayor
        currentMonthSchedules.sort((a, b) => {
            return new Date(a.fecha) - new Date(b.fecha);
        });

        return currentMonthSchedules;
    }

    const getCurrentMonth = () => {
        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        return months[currentMonthIndex];
    };

    return (
        <Document>
            <Page size="letter" style={styles.page}>
                <Image src={Logo} style={styles.logo} />
                <Text style={styles.title}>Reporte de Horarios de estilistas del mes de {getCurrentMonth()}</Text>

                {loading ? (
                    <Text>Cargando horarios...</Text>
                ) : (
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableHeaderText}>Fecha</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableHeaderText}>Estilista</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableHeaderText}>Hora Inicio</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableHeaderText}>Hora Final</Text>
                            </View>
                        </View>
                        {schedules.map(schedule => (
                            <View style= {styles.tableRow} key={schedule.horarioID}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCellText}>{new Date(schedule.fecha).toLocaleDateString('en-GB')}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCellText}>{schedule.Usuarios.nombre} {schedule.Usuarios.apellidos}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCellText}>{schedule.horaInicio}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCellText}>{schedule.horaFinal}</Text>
                                </View>
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
}

const styles = StyleSheet.create({
    page: {
        padding: 40,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f2f2f2',
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableHeaderText: {
        margin: 5,
        fontSize: 12,
        fontWeight: 'bold',
    },
    tableCellText: {
        margin: 5,
        fontSize: 10,
    },
    reportDateContainer: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 10,
    },
    reportDateTitle: {
        fontWeight: 'bold',
        marginBottom: 2,
    },
    reportDateText: {
        fontSize: 8,
        marginBottom: 2,
    }
});

export default PDFSchedule;