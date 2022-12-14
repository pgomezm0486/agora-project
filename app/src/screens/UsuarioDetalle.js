import { View, Text, ScrollView } from "react-native";
import React, { useContext } from "react";
import { Avatar, Button, Chip, lightColors, useTheme } from "@rneui/themed";
import ReadOnly from "../components/ReadOnly";
import styles from "../styles";
import { AuthContext, useAuthContext } from "../components/AuthContext";
import { Ubicaciones } from "../models/Ubicaciones";
import { useDataContext } from "../components/DataContext";
import { deleteById } from "../api";

const UsuarioDetalle = ({ navigation }) => {
	const { signOut } = useAuthContext();
	const { data } = useDataContext();
	const { theme } = useTheme();
	const { nombre, apellidoPaterno, apellidoMaterno, email, phoneNumber, uid, ubicacion } = data;

	const handleUpdate = () => {
		navigation.navigate("UsuarioFormulario", {
			mode: "editar",
			data: {
				uid,
				nombre,
				apellidoPaterno,
				apellidoMaterno,
				email,
				phoneNumber: phoneNumber.substring(3),
				ubicacion
			}
		});
	};

	const handleCancel = async () => {
		try {
			const { message } = await deleteById("usuarios", uid);
			alert(message);
			signOut();
		} catch (e) {
			alert(JSON.stringify(e));
		}
	};

	return (
		<ScrollView contentContainerStyle={[styles.screenProps, { paddingHorizontal: 30 }]}>
			<View style={styles.topCenterProps}>
				<Avatar title={data.avatar} rounded size={128} containerStyle={{ marginBottom: 16 }} />
				<Chip
					title={data.tipo.toCapitalize()}
					color={theme.colors.secondary}
					containerStyle={{ marginBottom: 32 }}
				/>
				<ReadOnly value={data.displayName} label="Nombre" />
				<ReadOnly value={data.ubicacion} label="Ubicación" />
				<ReadOnly value={data.email} label="Correo" />
				<ReadOnly value={data.phoneNumber} label="Teléfono" />
				<Button title="Actualizar cuenta" containerStyle={{ width: "100%" }} onPress={handleUpdate} />
				<Button
					title="Cambiar contraseña"
					titleStyle={{ color: theme.colors.secondary }}
					containerStyle={{ width: "100%" }}
					type="clear"
				/>
				<Button
					title="Cerrar sesión"
					titleStyle={{ color: theme.colors.secondary }}
					containerStyle={{ width: "100%", marginBottom: 32 }}
					type="clear"
					onPress={() => signOut()}
				/>
				<Button
					title="Eliminar cuenta"
					titleStyle={{ color: lightColors.error }}
					containerStyle={{ width: "100%" }}
					type="clear"
					onPress={handleCancel}
				/>
			</View>
		</ScrollView>
	);
};

export default UsuarioDetalle;
