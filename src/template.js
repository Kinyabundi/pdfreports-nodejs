const{ Document, Page, Text, View, StyleSheet } = require('@react-pdf/renderer');
const React = require('react');


const styles = StyleSheet.create({
    body: {
        paddingTop: 20,
        paddingHorizontal: 35,
        width: "100%",
        paddingLeft: 10,
        backgroundColor: "#ffffff",
    },
    header: {
        fontSize: 18,
        marginBottom: 8,
        color: "#211C6A",
        fontWeight: "bold",
        textTransform: "uppercase",
        textDecoration: "underline",
    },
    headerSection: {
       marginTop: "10px",
       width: "100%",
    },
    headerItem: {
       width: "100%",
    },
    title: {
        fontSize: 14,
        marginBottom: 8,
        color: "#211C6A",
        fontWeight: "bold",
    },
    titleDescription: {
        fontSize: 12,
        color: "black",
        fontWeight: "normal",
    },
    period: {
        color: "#000000",
        fontWeight: "extrabold",
        fontSize: 14,
    },
    emissionSection: {
        marginTop: "20px",
        width: "100%",
        marginBottom: "30px",

    },
    emissionItem: {
        width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		marginVertical: 3,
    },
    emissionTextContainer1: {
		width: "100%",
	},
    emissionTitle: {
        fontSize: 18,
        color: "#211C6A",
        fontWeight: "extrabold",
    },
    emissionTextContainer2: {
        width: "100%",
    },
    emissionTextContainer3: {
        width: "100%",
    },
    emissionTitleText: {
        marginLeft: "auto",
        fontSize: 18,
        color: "#211C6A",
        fontWeight: "extrabold",
    },
    emissionItem1: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: 3,
    },
    emissionItem2: {
        paddingTop: 20,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: 3,
    },
    emissionScope: {
        fontSize: 16,
        color: "#211C6A",
        fontWeight: "extrabold",
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "black",
        marginVertical: 5,
    },
    emissionItem1Content: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: 3,
    },
    emissionItem1ContentTitle: {
        marginLeft: "auto",
        fontSize: 11,
        color: "#211C6A",
        fontWeight: "light",
    },
    emissionItem1ContentType : {
        marginLeft: "auto",
        fontSize: 11,
        color: "black",
        fontWeight: "light",
    },
    item : {
        paddingTop: 10,
    },
    total: {
        marginLeft: "auto",
        fontSize: 18,
        color: "#211C6A",
        fontWeight: "extrabold",
    }

});

const Report = ({ data }) => {
    return (
        <Document>
            <Page size={"A4"} style={styles.body}>
                <Text style={styles.header}>
                    Table
                </Text>
                <View style={styles.headerSection}>
                    <View style={styles.headerItem}>
                        <Text style={styles.title}>{data.title}</Text>
                        <Text style={styles.titleDescription}>
                            Overall, the result of the period <Text style={styles.period}>
                                {data.period}
                            </Text>
                        </Text>
                    </View>
                </View>
                {Object.keys(data.emissions).map(scopeKey => {
                    const scope = data.emissions[scopeKey];
                    return (
                        <View key={scopeKey} style={styles.emissionSection}>
                            <View style={styles.emissionItem}>
                                <View style={styles.emissionTextContainer1}>
                                    <Text style={styles.emissionTitle}>{scope.title}</Text>
                                </View>
                                <View style={styles.emissionTextContainer2}>
                                    <Text style={styles.emissionTitleText}>{scope.totalCO2}</Text>
                                </View>
                                <View style={styles.emissionTextContainer3}>
                                    <Text style={styles.emissionTitleText}>{scope.percentage}</Text>
                                </View>
                            </View>
                            {scope.sources.map((source, index) => (
                                <View key={index} style={styles.emissionItem1}>
                                    <View style={styles.emissionTextContainer1}>
                                        <Text style={styles.emissionScope}>{source.description}</Text>
                                    </View>
                                    <View style={styles.emissionTextContainer2}>
                                        <Text style={styles.emissionTitleText}>{source.co2}</Text>
                                    </View>
                                    <View style={styles.emissionTextContainer3}>
                                        <Text style={styles.emissionTitleText}>{source.percentage}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    );
                })}
                <View style={styles.divider}></View>
                <View style={styles.emissionItem2}>
                    <View style={styles.emissionTextContainer1}>
                        <Text style={styles.total}>Overall results</Text>
                    </View>
                    <View style={styles.emissionTextContainer2}>
                        <Text style={styles.total}>{data.overall.totalCO2}</Text>
                    </View>
                    <View style={styles.emissionTextContainer3}>
                        <Text style={styles.total}>{data.overall.percentage}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

module.exports = Report;