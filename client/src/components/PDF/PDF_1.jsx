import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { decodeToken } from '../../../utils/tokenUtils';
import Logo from '../../assets/logo.png';
import { getAppointments } from '../../../api/apptApi';

const PDF_1 = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [userData, setUserData] = useState({ usuarioID: '', nombre: '', apellido: '', correo: '' });
  const [citas, setCitas] = useState([]);
  const [ultimaCita, setUltimaCita] = useState(null); // Estado para guardar la última cita

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);

        const ipapiResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
        const ipapiData = await ipapiResponse.json();
        setCountry(ipapiData.country_name);
        setCity(ipapiData.city);
        setRegion(ipapiData.region);
      } catch (error) {
        console.error("Error al obtener la información de la IP:", error);
      }
    };

    const loadAppointments = async (userId) => {
      try {
        const appointments = await getAppointments(userId);
        setCitas(appointments);
        if (appointments.length > 0) {
          setUltimaCita(appointments[appointments.length - 1]); // Guardar la última cita
        }
      } catch (error) {
        console.error("Error al cargar las citas:", error);
      }
    };

    const decodedToken = decodeToken();
    if (decodedToken) {
      setUserData({
        usuarioID: decodedToken.userId,
        nombre: decodedToken.name,
        apellido: decodedToken.lastName,
        correo: decodedToken.email,
      });
      loadAppointments(decodedToken.userId);
    }

    fetchData();
  }, []);

  return (
    <Document>
      <Page size="letter" style={styles.page}>
        <Image src={Logo} style={styles.logo1} />
        <Image src={Logo} style={styles.logo2} />
        <Text style={styles.title}>Reporte de Actividad del Usuario</Text>

        <View style={styles.userData}>
          <Text style={styles.userDataText}>Nombre: {userData.nombre + ' ' + userData.apellido}</Text>
          <Text style={styles.userDataText}>Correo: {userData.correo}</Text>
          <Text style={styles.userDataText}>Fecha última Cita: {ultimaCita ? new Date(ultimaCita.fechaCita).toISOString().split('T')[0] : 'No hay citas'}</Text>
          <Text style={styles.userDataText}>Último Servicio Utilizado: {ultimaCita ? ultimaCita.servicioCita : 'No hay citas'}</Text>
          <Text style={styles.userDataText}>País de Conexión: {country + ', ' + region + ', ' + city}</Text>
          <Text style={styles.userDataText}>Dirección IP: {ipAddress}</Text>
        </View>
v v
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  logo2: {
    width: 500,
    height: 500,
    position: 'absolute',
    opacity: 0.1,
    marginLeft: 70,
    marginTop: 80,
  },
  logo1: {
    width: 100,
    height: 100,
    position: 'absolute',
    marginLeft: 15,
  },
  userData: {
    width: '100%',
    padding: 40,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  userDataText: {
    fontSize: 12,
    marginBottom: 10,
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
});

export default PDF_1;






