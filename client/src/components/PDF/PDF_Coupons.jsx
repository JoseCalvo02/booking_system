import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from '../../assets/logo.png';
import { getRedeemedCoupons } from "../../../api/couponApi";

const PDF_Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const redeemedCoupons = await getRedeemedCoupons();
                const sortedCoupons = redeemedCoupons.sort((a, b) => new Date(a.fechaCanje) - new Date(b.fechaCanje));
                setCoupons(sortedCoupons);
                setLoading(false);
            }
            catch (error) {
                console.error('Error al cargar los cupones:', error);
                setLoading(false);
            }
        }
        fetchData();

    }, []);

    return (
        <Document>
            <Page size="letter" style={styles.page}>
                <Image src={Logo} style={styles.logo} />
                <Text style={styles.title}>Reporte de Cupones Canjeados</Text>

                {loading ? (
                    <Text style={styles.loadingText}>Cargando cupones...</Text>
                ) : (
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Fecha de Canje</Text>
                            <Text style={styles.tableHeader}>Cliente</Text>
                            <Text style={styles.tableHeader}>Cupón</Text>
                            <Text style={styles.tableHeader}>Puntos</Text>

                        </View>
                        {coupons.map((coupon, index) => (
                            <View style={styles.tableRow} key={index}>
                                <Text style={styles.tableCell}>{new Date(coupon.fecha).toLocaleDateString('es-ES')}</Text>
                                <Text style={styles.tableCell}>{coupon.Usuarios.nombre} {coupon.Usuarios.apellidos}</Text>
                                <Text style={styles.tableCell}>{coupon.Cupones.nombreCupon}</Text>
                                <Text style={styles.tableCell}>{coupon.Cupones.valorPuntos}</Text>
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
        fontSize: 12,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    tableHeader: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 5,
    },
    tableCell: {
        flex: 1,
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

export default PDF_Coupons;