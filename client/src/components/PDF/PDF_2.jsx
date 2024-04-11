import React, { useEffect, useState } from 'react';
import { Document, Text, Page, View, Image, StyleSheet } from '@react-pdf/renderer';
import { decodeToken } from '../../utils/tokenUtils';
import Logo from '../../assets/logo.png';
import { getAppointments } from "../../../api/apptApi";

const PDF_1 = () => {
  const [userData, setUserData] = useState({
    usuarioID: '',
    nombre: '',
    apellidos: '',
  });

  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const decodedToken = decodeToken();
    if (decodedToken) {
      setUserData({
        usuarioID: decodedToken.userId,
        nombre: decodedToken.name,
        apellidos: decodedToken.lastName,
      });
      loadAppointments(decodedToken.userId);
    }
  }, []);

  const loadAppointments = async (userId) => {
    try {
      const appointments = await getAppointments(userId);
      setCitas(appointments);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar las citas:", error);
      setLoading(false);
    }
  }

  return (
    <Document>
      <Page size="letter" style={styles.page}>
        <Image src={Logo} style={styles.logo1} />
        <Text style={styles.title}>Reporte Citas de {userData.nombre}</Text>
        
        <View style={styles.userData}>
          <Text style={styles.userDataText}>Usuario: {userData.nombre} {userData.apellidos}</Text>
        </View>

        {loading ? (
          <Text>Cargando citas...</Text>
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
                <Text style={styles.tableHeaderText}>Hora Cita</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableHeaderText}>Servicio</Text>
              </View>
            </View>
            {citas.map((cita) => (
              <View style={styles.tableRow} key={cita.citaID}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableDataText}>{new Date(cita.fechaCita).toISOString().split('T')[0]}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableDataText}>{cita.nombreEstilista}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableDataText}>{new Date(cita.horaCita).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableDataText}>{cita.servicioCita}</Text>
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
    fontFamily: 'Helvetica',
    fontSize: 12,
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 40,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  logo1: {
    width: 100,
    height: 100,
    marginLeft: 15,
  },
  userData: {
    width: '100%',
    padding: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  userDataText: {
    fontSize: 10,
  },
  reportDateContainer: {
    marginTop: 20,
    padding: 20,
    marginLeft: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  reportDate: {
    fontSize: 12,   
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 20,
  },
  tableRow: { 
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableColHeader: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f2f2f2',
    padding: 5,
  },
  tableCol: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableDataText: {
    fontSize: 10,
    textAlign: 'center',
  },
});

export default PDF_1;

