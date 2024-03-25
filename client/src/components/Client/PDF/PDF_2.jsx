import React, { useEffect, useState } from 'react';
import { Document, Text, Page, View, Image, StyleSheet } from '@react-pdf/renderer';
import { jwtDecode } from 'jwt-decode';
import Logo from '../../../assets/logo.png';

const PDF_1 = () => {
  const [userData, setUserData] = useState({ nombre: '', correo: '', apellido: ''});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    setUserData({
      nombre: decoded.name,
      correo: decoded.email,
      apellidos: decoded.lastName,
    });
  }, []);

  return (
    <Document>
      <Page size="letter" style={styles.page}>
        <Image src={Logo} style={styles.logo1} />
        <Image src={Logo} style={styles.logo2} />
        <Text style={styles.title}>Reporte de Citas de Usuario</Text>
        
        <View style={styles.userData}>
          <Text style={styles.userDataText}>Usuario: {userData.nombre + ' ' +  userData.apellidos}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderText}>ID de Cita</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderText}>Fecha</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderText}>Estilista</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderText}>Servicio</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderText}>Estado</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableDataText}>1</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableDataText}>2021-08-01</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableDataText}>Juan Perez</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableDataText}>Corte de Cabello</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableDataText}>Realizada</Text>
            </View>
          </View>
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
    fontSize: 18,
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
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tableRow: { 
    flexDirection: 'row' 
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#black',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
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
