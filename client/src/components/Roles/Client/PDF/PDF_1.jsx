import React, { useEffect, useState } from 'react';
import { Document, Text, Page, View, Image, StyleSheet } from '@react-pdf/renderer';
import { jwtDecode } from 'jwt-decode';
import Logo from '../../../../assets/logo.png';

const PDF_1 = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [country, setCountry] = useState('');
  const [City, setCity] = useState('');
  const [region , setRegion] = useState('');
  const [userData, setUserData] = useState({ nombre: '', correo: '', apellido: ''});


  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    setUserData({
      nombre: decoded.name,
      correo: decoded.email,
      apellidos: decoded.lastName,
    });

    fetch('https://api64.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        setIpAddress(data.ip);

        fetch(`https://ipapi.co/${data.ip}/json/`)
          .then((response) => response.json())
          .then((data) => {
            setCountry(data.country_name);

            fetch(`https://ipapi.co/${data.ip}/json/`)
              .then((response) => response.json())
              .then((data) => {
                setCity(data.city);
              });

            fetch(`https://ipapi.co/${data.ip}/json/`)
              .then((response) => response.json())
              .then((data) => {
                setRegion(data.region);
              });
          });
      });
  }, []);

  return (
    <Document>
      <Page size="letter" style={styles.page}>
        <Image src={Logo} style={styles.logo1} />
        <Image src={Logo} style={styles.logo2} />
        <Text style={styles.title}>Reporte de Actividad del Usuario</Text>
        
        <View style={styles.userData}>
          <Text style={styles.userDataText}>Nombre: {userData.nombre + ' ' +  userData.apellidos}</Text>
          <Text style={styles.userDataText}>Correo: {userData.correo}</Text>
          <Text style={styles.userDataText}>Fecha ultima Cita:</Text>
          <Text style={styles.userDataText}>Ultimo Servicio Utilizado:</Text>
          <Text style={styles.userDataText}>País de Conexión: {country + ', ' + region + ', ' + City}</Text>
          <Text style={styles.userDataText}>Dirección IP: {ipAddress}</Text>\
        </View>

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




