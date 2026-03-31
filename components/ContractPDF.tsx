'use client';

import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { services } from '@/config/services';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2px solid #003399',
    paddingBottom: 15,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003399',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003399',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#003399',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
    color: '#262626',
  },
  value: {
    width: '70%',
    color: '#7a7a7a',
  },
  serviceItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#FBFAF6',
    borderRadius: 4,
  },
  serviceName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#003399',
    marginBottom: 5,
  },
  packageName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#262626',
    marginBottom: 5,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 10,
  },
  bullet: {
    width: 15,
    color: '#003399',
  },
  listText: {
    flex: 1,
    fontSize: 10,
    color: '#7a7a7a',
  },
  totalSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#003399',
    borderRadius: 4,
  },
  totalLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  signatureSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FBFAF6',
    borderRadius: 4,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  signatureBox: {
    width: '48%',
  },
  signatureLabel: {
    fontSize: 10,
    color: '#7a7a7a',
    marginBottom: 5,
  },
  signatureValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#262626',
    borderBottom: '1px solid #262626',
    paddingBottom: 5,
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTop: '1px solid #7a7a7a',
    fontSize: 9,
    color: '#7a7a7a',
    textAlign: 'center',
  },
});

interface ContractData {
  selectedServiceIds: string[];
  selectedPackages: Record<string, string>;
  clientInfo: {
    name: string;
    email: string;
    company: string;
    phone?: string;
  };
  projectInfo: {
    projectName: string;
    description: string;
  };
  signerInfo: {
    name: string;
    email?: string;
    title?: string;
  };
  signatureDate: string;
}

interface ContractPDFProps {
  formData: ContractData;
}

export function ContractPDF({ formData }: ContractPDFProps) {
  const {
    selectedServiceIds,
    selectedPackages,
    clientInfo,
    projectInfo,
    signerInfo,
    signatureDate,
  } = formData;

  // Calculate total
  const total = selectedServiceIds.reduce((sum, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    const packageId = selectedPackages[serviceId];
    const pkg = service?.packages.find(p => p.id === packageId);
    return sum + (pkg?.price || 0);
  }, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>BLURRD STUDIO</Text>
          <Text style={styles.title}>Service Agreement</Text>
          <Text style={{ fontSize: 9, color: '#7a7a7a' }}>
            Generated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>

        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{clientInfo.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{clientInfo.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Company:</Text>
            <Text style={styles.value}>{clientInfo.company || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{clientInfo.phone || 'N/A'}</Text>
          </View>
        </View>

        {/* Project Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Project Name:</Text>
            <Text style={styles.value}>{projectInfo.projectName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{projectInfo.description || 'N/A'}</Text>
          </View>
        </View>

        {/* Selected Services & Packages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services & Deliverables</Text>
          {selectedServiceIds.map((serviceId) => {
            const service = services.find(s => s.id === serviceId);
            const packageId = selectedPackages[serviceId];
            const pkg = service?.packages.find(p => p.id === packageId);

            if (!service || !pkg) return null;

            return (
              <View key={serviceId} style={styles.serviceItem}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.packageName}>
                  {pkg.name} Package - ${pkg.price.toLocaleString()} - {pkg.timeline}
                </Text>
                
                {/* Included Items */}
                {pkg.included.length > 0 && (
                  <View style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 4 }}>
                      Included:
                    </Text>
                    {pkg.included.map((item, idx) => (
                      <View key={idx} style={styles.listItem}>
                        <Text style={styles.bullet}>✓</Text>
                        <Text style={styles.listText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Not Included Items */}
                {pkg.notIncluded.length > 0 && (
                  <View style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 4 }}>
                      Not Included:
                    </Text>
                    {pkg.notIncluded.map((item, idx) => (
                      <View key={idx} style={styles.listItem}>
                        <Text style={styles.bullet}>✗</Text>
                        <Text style={styles.listText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Project Investment</Text>
          <Text style={styles.totalAmount}>${total.toLocaleString()}</Text>
        </View>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <Text style={styles.sectionTitle}>Agreement</Text>
          <Text style={{ fontSize: 10, color: '#7a7a7a', marginBottom: 15 }}>
            By signing below, the authorized representative agrees to the terms and conditions 
            outlined in this service agreement and authorizes BLURRD STUDIO to proceed with the 
            project as described.
          </Text>
          
          <View style={styles.signatureRow}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Authorized Signature</Text>
              <Text style={styles.signatureValue}>{signerInfo.name}</Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Date</Text>
              <Text style={styles.signatureValue}>{signatureDate}</Text>
            </View>
          </View>

          {signerInfo.title && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.signatureLabel}>Title</Text>
              <Text style={styles.signatureValue}>{signerInfo.title}</Text>
            </View>
          )}

          {signerInfo.email && signerInfo.email !== clientInfo.email && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.signatureLabel}>Signer Email</Text>
              <Text style={styles.signatureValue}>{signerInfo.email}</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>BLURRD STUDIO</Text>
          <Text>This agreement is subject to our standard terms and conditions.</Text>
          <Text>For questions, contact: hello@blurrdstudio.com</Text>
        </View>
      </Page>
    </Document>
  );
}

// Utility function to generate PDF blob
export async function generateContractPDF(formData: ContractData): Promise<Blob> {
  const blob = await pdf(<ContractPDF formData={formData} />).toBlob();
  return blob;
}

// Utility function to download PDF
export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Export the ContractData type for use in other components
export type { ContractData };
