import { PropsWithChildren } from 'react';
import { Text, ScrollView, View } from 'react-native';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';

const H1 = ({ children }: PropsWithChildren) => <Text style={typography.h1}>{children}</Text>;
const H2 = ({ children }: PropsWithChildren) => <Text style={typography.h2}>{children}</Text>;
const H3 = ({ children }: PropsWithChildren) => <Text style={typography.h3}>{children}</Text>;
const H4 = ({ children }: PropsWithChildren) => <Text style={typography.h4}>{children}</Text>;
const LB = () => <Text>{'\n'}</Text>;

const PrivacyPolicy = () => {
  return (
    <ScrollView style={[spacing.pa1, spacing.pb6]}>
      <View style={{ paddingBottom: 70 }}>
        <Text style={[typography.text]}>
          <H1>PRIVACY POLICY</H1> {'\n'}
          <H3>Effective Date: 1st October 2023</H3> <LB />
          <LB />
          Thank you for choosing Bravori! This Privacy Policy describes:
          <LB />
          <LB />• The ways we collect personal data about you and why we do so
          <LB />• How we use your personal data, and The choices you have about your personal data.
          <LB />
          <LB />
          <H3>CONTACT US</H3>
          <LB />
          <LB /> If you have questions about data protection, or if you have any requests for
          resolving issues with your personal data, we encourage you to primarily contact us through
          the support features within our APP, so we can reply to you more quickly. Alternatively,
          you may contact: <LB />
          <LB />
          Controller: Bravori Oy Address: Seltterikuja 8, 00390 Helsinki, Finland
          <LB />
          Email: info@bravorimusic.com
          <LB />
          <LB />
          <H3>Legal basis for processing of personal data</H3>
          <LB />
          <LB /> The legal basis to collect and process personal data described below depends on the
          context in which the information is collected. As a rule, Bravori collects personal data
          on the basis of your consent and/or based on our legitimate interest (duly taking into
          account your rights). We process your personal data on the basis of your consent when we
          make applications (‘services’) available to you, provide customer service, integrate our
          services with distribution platforms and inform you of our service-related changes and
          developments. On the basis of our legitimate interests we carry out our marketing, inform
          you about our new available services and create and analyze statistics on how our users
          use our services. We may also process your personal data to fulfill our legal obligations.
          <LB />
          <LB />
          <H3>Personal Data collected by Bravori</H3>
          <LB />
          <LB />
          Bravori collects personal data through its services, website and social media platforms.
          Mobile applications provided by Bravori automatically collect information from you and
          from your device. Information collected by applications include:
          <LB />
          <LB />
          <LB />
          • Data and analytics concerning how you use the application
          <LB />
          • Data and analytics on the functioning of the application
          <LB />
          • Your IP address and device identifiers such as your device ID number
          <LB />
          • Your device type and operating system
          <LB />
          • Geographical location based on your IP address
          <LB />
          <LB />
          In addition, Bravori may receive data concerning your Bravori application downloads from
          your mobile store provider (Apple App Store / Google Play).
          <LB />
          <LB />
          Information processed typically includes your:
          <LB />
          <LB />
          • Username
          <LB />
          • Profile picture
          <LB />
          • Age range
          <LB />
          <H3>Data Sharing </H3>
          <LB />
          <LB />
          Your personal data may be transferred and processed in countries other than the country of
          which you are a resident. Bravori may use subcontractors outside EU/EEA. As a rule, the
          data processed by Bravori locates within the European Union. Data is stored in cloud
          services, the servers of which may locate outside the EU/EEA. Where data is transferred
          outside ETA/EEA, appropriate contractual arrangements are made.
          <LB />
          <LB />
          <H3>Storage</H3>
          <LB />
          <LB />
          Bravori retains personal information in line with its purposes of processing, as long as
          we are required to by law or until we receive a deletion request provided that we are not
          required or have an overriding legitimate interest to keep it. Data Security Bravori has
          appropriate technical and organizational security policies and procedures in place to
          protect personal data from loss, misuse or other comparable unauthorized access.
          <LB />
          <LB />
          <H3>Data Subject Rights</H3>
          <LB />
          <LB />
          You have the right to access your personal data or to have any inaccurate information
          about you corrected. You have the right to request the deletion of your personal
          information at any time, if it is not our legitimate interest or our legal obligation to
          retain certain personal information. You have the right to lodge a complaint with a
          supervisory authority.
          <LB />
          <LB />
          • Right to access
          <LB />
          • Right to rectification - you have the right to have your personal data corrected,
          updated and completed.
          <LB />
          • Right to erasure (‘right to be forgotten’) - you have the right to have your personal
          data deleted, if we do not have legitimate interest or legal obligation to retain the
          data.
          <LB />
          • Right to restriction of processing - you have the right to obtain restriction of
          processing if you object to processing, contest the lawfulness of the processing or
          accuracy of the data or if you need the data to defend your legal claims.
          <LB />
          • Right to data portability - if the processing of your data has been based on your
          consent or contract, you have the right to receive your data in machine readable format
          and have it transferred to another controller.
          <LB />
          <LB />
          You also have the right to lodge a complaint with the supervision authority in Finland.
          The supervision authority in Finland is the Data Protection Ombudsman’s Office. You can
          contact the Finnish Ombudsman’s office at tietosuoja@om.fi. If you wish to make a request,
          or if you have any other questions relating to your rights or this privacy policy, please
          contact us at info@bravorimusic.com
          <LB />
          <LB />
          <H3>Updates to the Privacy Policy</H3>
          <LB />
          <LB />
          We may update this Privacy Notice from time to time in response to changing legal,
          technical or business developments. When we update our Privacy Notice, we will take
          appropriate measures to inform you, in accordance with the significance of the changes we
          make.
        </Text>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;
