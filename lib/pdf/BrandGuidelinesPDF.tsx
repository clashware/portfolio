import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "@react-pdf/renderer";

// Brand Colors
const colors = {
  primary: "#DC2626",
  secondary: "#F97316",
  dark: "#991B1B",
  obsidian: "#0A0A0F",
  slateDark: "#18181B",
  snow: "#FAFAFA",
  zinc: "#A1A1AA",
  stone: "#71717A",
  metacube: "#22C55E",
  bonega: "#A855F7",
  coira: "#10B981",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.obsidian,
    padding: 40,
    color: colors.snow,
    fontFamily: "Helvetica",
  },
  coverPage: {
    backgroundColor: colors.obsidian,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  coverContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  coverTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.snow,
    marginTop: 30,
    marginBottom: 10,
  },
  coverSubtitle: {
    fontSize: 18,
    color: colors.zinc,
    marginBottom: 20,
  },
  coverTagline: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 60,
  },
  coverDate: {
    fontSize: 10,
    color: colors.stone,
    position: "absolute",
    bottom: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.snow,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 10,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.snow,
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 11,
    color: colors.zinc,
    marginBottom: 12,
    lineHeight: 1.6,
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  colorInfo: {
    flex: 1,
  },
  colorName: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.snow,
    marginBottom: 2,
  },
  colorHex: {
    fontSize: 10,
    color: colors.zinc,
  },
  gridRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  gridCol: {
    flex: 1,
    paddingRight: 15,
  },
  card: {
    backgroundColor: colors.slateDark,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  doItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dontItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkMark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.metacube,
    marginRight: 10,
  },
  xMark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginRight: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.slateDark,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: colors.stone,
  },
  pageNumber: {
    fontSize: 8,
    color: colors.stone,
  },
});

// Logo SVG Component
const LogoSvg = () => (
  <Svg width={100} height={100} viewBox="0 0 120 120">
    <Defs>
      <LinearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor={colors.primary} />
        <Stop offset="50%" stopColor={colors.secondary} />
        <Stop offset="100%" stopColor="#EA580C" />
      </LinearGradient>
    </Defs>
    <Circle cx="60" cy="60" r="56" fill={colors.obsidian} stroke={colors.primary} strokeWidth="2" />
    <Path d="M28 32 L60 60 L92 88 L88 92 L60 64 L32 36 Z" fill={colors.primary} />
    <Path d="M92 32 L60 60 L28 88 L32 92 L60 64 L88 36 Z" fill={colors.secondary} />
    <Circle cx="60" cy="60" r="8" fill={colors.snow} opacity="0.9" />
    <Circle cx="60" cy="60" r="4" fill={colors.primary} />
  </Svg>
);

// Color Swatch Component
const ColorSwatch = ({ color, name, hex }: { color: string; name: string; hex: string }) => (
  <View style={styles.colorRow}>
    <View style={[styles.colorSwatch, { backgroundColor: color }]} />
    <View style={styles.colorInfo}>
      <Text style={styles.colorName}>{name}</Text>
      <Text style={styles.colorHex}>{hex}</Text>
    </View>
  </View>
);

export const BrandGuidelinesPDF = () => (
  <Document>
    {/* Cover Page */}
    <Page size="A4" style={styles.coverPage}>
      <View style={styles.coverContent}>
        <LogoSvg />
        <Text style={styles.coverTitle}>Brand Guidelines</Text>
        <Text style={styles.coverSubtitle}>Clashware Sarl</Text>
        <Text style={styles.coverTagline}>Swiss Precision. Bold Innovation.</Text>
        <Text style={styles.coverDate}>Version 1.0 | {new Date().getFullYear()}</Text>
      </View>
    </Page>

    {/* Brand Story */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Brand Story</Text>

      <Text style={styles.subsectionTitle}>Who We Are</Text>
      <Text style={styles.paragraph}>
        Clashware is a Swiss technology company headquartered in Lausanne. We build
        products at the intersection of gaming, artificial intelligence, and blockchain
        technology.
      </Text>

      <Text style={styles.subsectionTitle}>Our Philosophy</Text>
      <Text style={styles.paragraph}>
        We believe technology should be bold, not boring. While we embrace the Swiss
        tradition of precision and reliability, we refuse to play it safe. Every product
        we build challenges conventions and explores new frontiers.
      </Text>
      <Text style={styles.paragraph}>
        Our name reflects our approach: we clash with the status quo. We clash with
        limitations. We clash with &quot;good enough.&quot;
      </Text>

      <Text style={styles.subsectionTitle}>Brand Positioning</Text>
      <Text style={styles.paragraph}>
        &quot;Swiss Precision. Bold Innovation.&quot; This tagline captures our dual identity:
        the reliability and quality associated with Swiss engineering combined with
        the courage to push boundaries across gaming, AI, and crypto.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Clashware Brand Guidelines</Text>
        <Text style={styles.pageNumber}>2</Text>
      </View>
    </Page>

    {/* Logo Usage */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Logo Usage</Text>

      <Text style={styles.subsectionTitle}>The Clash Mark</Text>
      <Text style={styles.paragraph}>
        Our logo, the &quot;Clash Mark,&quot; features two abstract blade forms crossing at a
        dynamic 60-degree angle. The intersection creates a distinctive visual that
        embodies our name and competitive spirit.
      </Text>

      <View style={styles.card}>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <LogoSvg />
        </View>
      </View>

      <Text style={styles.subsectionTitle}>Logo Variations</Text>
      <Text style={styles.paragraph}>
        The logo is available in three variations: Full Logo (symbol + wordmark),
        Symbol Only (for favicons, app icons, social avatars), and Wordmark Only
        (for horizontal applications).
      </Text>

      <Text style={styles.subsectionTitle}>Clear Space</Text>
      <Text style={styles.paragraph}>
        Maintain clear space equal to 0.5x the symbol height on all sides. Minimum
        size: 24px for symbol, 80px for full logo.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Clashware Brand Guidelines</Text>
        <Text style={styles.pageNumber}>3</Text>
      </View>
    </Page>

    {/* Color Palette */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Color Palette</Text>

      <Text style={styles.subsectionTitle}>Primary Colors</Text>
      <View style={styles.gridRow}>
        <View style={styles.gridCol}>
          <ColorSwatch color={colors.primary} name="Crimson Fire" hex="#DC2626" />
          <ColorSwatch color={colors.secondary} name="Coral Blaze" hex="#F97316" />
          <ColorSwatch color={colors.dark} name="Deep Crimson" hex="#991B1B" />
        </View>
      </View>

      <Text style={styles.subsectionTitle}>Background Colors</Text>
      <View style={styles.gridRow}>
        <View style={styles.gridCol}>
          <ColorSwatch color={colors.obsidian} name="Obsidian" hex="#0A0A0F" />
          <ColorSwatch color={colors.slateDark} name="Slate Dark" hex="#18181B" />
        </View>
      </View>

      <Text style={styles.subsectionTitle}>Product Colors</Text>
      <View style={styles.gridRow}>
        <View style={styles.gridCol}>
          <ColorSwatch color={colors.metacube} name="Metacube" hex="#22C55E" />
          <ColorSwatch color={colors.bonega} name="Bonega.ai" hex="#A855F7" />
          <ColorSwatch color={colors.coira} name="Coira.io" hex="#10B981" />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Clashware Brand Guidelines</Text>
        <Text style={styles.pageNumber}>4</Text>
      </View>
    </Page>

    {/* Typography */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Typography</Text>

      <Text style={styles.subsectionTitle}>Primary Typeface: Inter</Text>
      <Text style={styles.paragraph}>
        Inter is our primary typeface for all digital and print applications. Its
        geometric, neutral design aligns with Swiss design principles while remaining
        highly legible at all sizes.
      </Text>

      <View style={styles.card}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.snow, marginBottom: 10 }}>
          Aa Bb Cc Dd Ee Ff Gg
        </Text>
        <Text style={{ fontSize: 14, color: colors.zinc }}>
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </Text>
        <Text style={{ fontSize: 14, color: colors.zinc }}>
          abcdefghijklmnopqrstuvwxyz
        </Text>
        <Text style={{ fontSize: 14, color: colors.zinc }}>
          0123456789
        </Text>
      </View>

      <Text style={styles.subsectionTitle}>Type Hierarchy</Text>
      <Text style={[styles.paragraph, { fontSize: 24, fontWeight: "bold", color: colors.snow }]}>
        Display: 48-96px Bold
      </Text>
      <Text style={[styles.paragraph, { fontSize: 18, fontWeight: "bold", color: colors.snow }]}>
        H1: 36px Bold
      </Text>
      <Text style={[styles.paragraph, { fontSize: 14, fontWeight: "bold", color: colors.snow }]}>
        H2: 24px Semibold
      </Text>
      <Text style={styles.paragraph}>Body: 16px Regular</Text>
      <Text style={[styles.paragraph, { fontSize: 10 }]}>Small: 14px Regular</Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Clashware Brand Guidelines</Text>
        <Text style={styles.pageNumber}>5</Text>
      </View>
    </Page>

    {/* Usage Guidelines */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Usage Guidelines</Text>

      <View style={styles.gridRow}>
        <View style={styles.gridCol}>
          <Text style={styles.subsectionTitle}>Do</Text>
          <View style={styles.doItem}>
            <View style={styles.checkMark} />
            <Text style={styles.paragraph}>Use the logo on dark backgrounds</Text>
          </View>
          <View style={styles.doItem}>
            <View style={styles.checkMark} />
            <Text style={styles.paragraph}>Maintain clear space around logo</Text>
          </View>
          <View style={styles.doItem}>
            <View style={styles.checkMark} />
            <Text style={styles.paragraph}>Use approved color variations</Text>
          </View>
          <View style={styles.doItem}>
            <View style={styles.checkMark} />
            <Text style={styles.paragraph}>Scale proportionally</Text>
          </View>
        </View>

        <View style={styles.gridCol}>
          <Text style={styles.subsectionTitle}>Don&apos;t</Text>
          <View style={styles.dontItem}>
            <View style={styles.xMark} />
            <Text style={styles.paragraph}>Rotate or skew the logo</Text>
          </View>
          <View style={styles.dontItem}>
            <View style={styles.xMark} />
            <Text style={styles.paragraph}>Change logo colors arbitrarily</Text>
          </View>
          <View style={styles.dontItem}>
            <View style={styles.xMark} />
            <Text style={styles.paragraph}>Add effects or shadows</Text>
          </View>
          <View style={styles.dontItem}>
            <View style={styles.xMark} />
            <Text style={styles.paragraph}>Use low contrast combinations</Text>
          </View>
        </View>
      </View>

      <Text style={styles.subsectionTitle}>Brand Voice</Text>
      <Text style={styles.paragraph}>
        Our voice is confident, precise, and forward-looking. We speak clearly without
        jargon or hype. Key attributes: Professional but energetic, Technical credibility,
        Swiss quality assurance.
      </Text>

      <Text style={styles.subsectionTitle}>Contact</Text>
      <Text style={styles.paragraph}>
        For brand inquiries: brand@clashware.com
      </Text>
      <Text style={styles.paragraph}>
        Clashware Sarl | Avenue de Jurigoz 15 | 1006 Lausanne, Switzerland
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Clashware Brand Guidelines</Text>
        <Text style={styles.pageNumber}>6</Text>
      </View>
    </Page>
  </Document>
);

export default BrandGuidelinesPDF;
