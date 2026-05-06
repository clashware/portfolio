import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import path from "path";

const colors = {
  background: "#0A0A0F",
  foreground: "#FAFAFA",
  muted: "#A1A1AA",
  border: "#27272A",
  brand: "#DC2626",
  brandLight: "#F97316",
  brandDark: "#991B1B",
  destructive: "#EF4444",
  metacube: "#22C55E",
  bonega: "#A855F7",
  coira: "#10B981",
  lengthen: "#3B82F6",
};

const logoPath = path.join(process.cwd(), "public/logo/clashware-logo.png");

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    padding: 50,
    paddingBottom: 70,
    color: colors.foreground,
    fontFamily: "Helvetica",
  },
  coverPage: {
    backgroundColor: colors.background,
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
  coverLogo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.foreground,
    letterSpacing: 6,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  coverSubtitle: {
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 8,
    textTransform: "uppercase",
    fontFamily: "Courier",
    marginBottom: 40,
  },
  coverDivider: {
    width: 40,
    height: 1,
    backgroundColor: colors.brand,
    marginBottom: 40,
  },
  coverTagline: {
    fontSize: 10,
    color: colors.muted,
    letterSpacing: 3,
    fontFamily: "Courier",
    textTransform: "uppercase",
  },
  coverDate: {
    fontSize: 8,
    color: colors.muted,
    position: "absolute",
    bottom: 40,
    letterSpacing: 2,
    fontFamily: "Courier",
    textTransform: "uppercase",
  },
  sectionNumber: {
    fontSize: 9,
    color: colors.brand,
    fontFamily: "Courier",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.foreground,
    letterSpacing: -0.5,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  sectionDivider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.brand,
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.foreground,
    marginTop: 20,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subsectionDivider: {
    width: 30,
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 10,
    color: colors.muted,
    marginBottom: 10,
    lineHeight: 1.7,
  },
  monoText: {
    fontSize: 9,
    color: colors.muted,
    fontFamily: "Courier",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "transparent",
  },
  cardDark: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#18181B",
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  colorCard: {
    width: 145,
    marginBottom: 12,
  },
  colorSwatch: {
    width: "100%",
    height: 44,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  colorName: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.foreground,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  colorHex: {
    fontSize: 8,
    color: colors.muted,
    fontFamily: "Courier",
  },
  colorToken: {
    fontSize: 7,
    color: colors.brand,
    fontFamily: "Courier",
    marginTop: 1,
  },
  gridRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  gridCol: {
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingLeft: 4,
  },
  checkMark: {
    width: 10,
    height: 10,
    backgroundColor: "#22C55E",
    marginRight: 10,
    marginTop: 2,
  },
  xMark: {
    width: 10,
    height: 10,
    backgroundColor: colors.brand,
    marginRight: 10,
    marginTop: 2,
  },
  listText: {
    fontSize: 9,
    color: colors.muted,
    flex: 1,
    lineHeight: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 7,
    color: colors.muted,
    letterSpacing: 2,
    fontFamily: "Courier",
    textTransform: "uppercase",
  },
  pageNumber: {
    fontSize: 7,
    color: colors.muted,
    fontFamily: "Courier",
  },
  logoDisplay: {
    alignItems: "center",
    paddingVertical: 24,
  },
  logoLarge: {
    width: 80,
    height: 80,
  },
  specRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 8,
  },
  specLabel: {
    fontSize: 8,
    color: colors.muted,
    fontFamily: "Courier",
    textTransform: "uppercase",
    letterSpacing: 1,
    width: 140,
  },
  specValue: {
    fontSize: 9,
    color: colors.foreground,
    flex: 1,
  },
});

const ColorCard = ({
  color,
  name,
  hex,
  token,
}: {
  color: string;
  name: string;
  hex: string;
  token?: string;
}) => (
  <View style={styles.colorCard}>
    <View style={[styles.colorSwatch, { backgroundColor: color }]} />
    <Text style={styles.colorName}>{name}</Text>
    <Text style={styles.colorHex}>{hex}</Text>
    {token && <Text style={styles.colorToken}>{token}</Text>}
  </View>
);

const PageFooter = ({ page }: { page: number }) => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Clashware Brand Guidelines V2</Text>
    <Text style={styles.pageNumber}>{String(page).padStart(2, "0")}</Text>
  </View>
);

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.specRow}>
    <Text style={styles.specLabel}>{label}</Text>
    <Text style={styles.specValue}>{value}</Text>
  </View>
);

export const BrandGuidelinesPDF = () => (
  <Document>
    <Page size="A4" style={styles.coverPage}>
      <View style={styles.coverContent}>
        <Image src={logoPath} style={styles.coverLogo} />
        <Text style={styles.coverTitle}>Brand Guidelines</Text>
        <Text style={styles.coverSubtitle}>Clashware Sarl</Text>
        <View style={styles.coverDivider} />
        <Text style={styles.coverTagline}>
          Swiss Precision. Bold Innovation.
        </Text>
        <Text style={styles.coverDate}>
          Version 2.0 | {new Date().getFullYear()} | EPFL Engineering Alumni
        </Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>// Section 01</Text>
      <Text style={styles.sectionTitle}>Design Philosophy</Text>
      <View style={styles.sectionDivider} />

      <Text style={styles.subsectionTitle}>The Machined Interface</Text>
      <View style={styles.subsectionDivider} />
      <Text style={styles.paragraph}>
        Clashware&apos;s V2 design language is &quot;Swiss Editorial meets
        High-Performance Engineering.&quot; Every element is machined with
        precision: sharp edges, 1px structural borders, high-contrast
        typography, and surgical use of color. No soft shadows, no rounded
        corners, no visual excess.
      </Text>

      <Text style={styles.subsectionTitle}>Core Principles</Text>
      <View style={styles.subsectionDivider} />

      <View style={styles.card}>
        <SpecRow label="Border Radius" value="0px everywhere. No exceptions." />
        <SpecRow label="Shadows" value="None. Use 1px inset borders for depth." />
        <SpecRow label="Color Mode" value="Dark-only. #0A0A0F canvas." />
        <SpecRow label="Accent Usage" value="Swiss Red #DC2626 used surgically." />
        <SpecRow label="Animation" value="Snappy cubic-bezier(0.16, 1, 0.3, 1)" />
        <SpecRow label="Contrast" value="WCAG AAA minimum. 18.7:1 primary text." />
      </View>

      <Text style={styles.subsectionTitle}>Brand Positioning</Text>
      <View style={styles.subsectionDivider} />
      <Text style={styles.paragraph}>
        Clashware is a Swiss technology company founded by EPFL engineers.
        The website itself must demonstrate extreme technical competence.
        The design should feel like a technical instrument, not a marketing
        template.
      </Text>

      <View style={styles.cardDark}>
        <Text style={styles.monoText}>[SYS.IDENTITY]</Text>
        <Text style={styles.monoText}>ORIGIN: LAUSANNE, SWITZERLAND</Text>
        <Text style={styles.monoText}>FOUNDERS: EPFL ENGINEERING ALUMNI</Text>
        <Text style={styles.monoText}>PRODUCTS: METACUBE | BONEGA.AI | COIRA.IO</Text>
        <Text style={styles.monoText}>REGISTRATION: CHE-178.795.076</Text>
      </View>

      <PageFooter page={2} />
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>// Section 02</Text>
      <Text style={styles.sectionTitle}>Logo</Text>
      <View style={styles.sectionDivider} />

      <Text style={styles.subsectionTitle}>The Clash Mark</Text>
      <View style={styles.subsectionDivider} />
      <Text style={styles.paragraph}>
        Two crossed blades forming an X with a crimson-to-orange gradient.
        The intersection creates a glowing center point representing the
        spark of innovation. The logo embodies precision, strength, and
        competitive spirit.
      </Text>

      <View style={styles.card}>
        <View style={styles.logoDisplay}>
          <Image src={logoPath} style={styles.logoLarge} />
        </View>
      </View>

      <Text style={styles.subsectionTitle}>Logo Specifications</Text>
      <View style={styles.subsectionDivider} />
      <View style={styles.card}>
        <SpecRow label="Clear Space" value="0.5x symbol height on all sides" />
        <SpecRow label="Min Size (Symbol)" value="24px" />
        <SpecRow label="Min Size (Full)" value="80px" />
        <SpecRow label="Background" value="Dark only (#0A0A0F or darker)" />
        <SpecRow label="File Formats" value="SVG (web), PNG (print/social)" />
      </View>

      <Text style={styles.subsectionTitle}>Logo Variations</Text>
      <View style={styles.subsectionDivider} />
      <View style={styles.gridRow}>
        <View style={styles.gridCol}>
          <View style={styles.card}>
            <Text style={{ fontSize: 9, fontWeight: "bold", color: colors.foreground, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
              Full Logo
            </Text>
            <Text style={{ fontSize: 8, color: colors.muted, fontFamily: "Courier" }}>
              Symbol + CLASHWARE wordmark. Primary usage.
            </Text>
          </View>
        </View>
        <View style={styles.gridCol}>
          <View style={styles.card}>
            <Text style={{ fontSize: 9, fontWeight: "bold", color: colors.foreground, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
              Symbol Only
            </Text>
            <Text style={{ fontSize: 8, color: colors.muted, fontFamily: "Courier" }}>
              Favicons, app icons, avatars, small spaces.
            </Text>
          </View>
        </View>
        <View style={styles.gridCol}>
          <View style={styles.card}>
            <Text style={{ fontSize: 9, fontWeight: "bold", color: colors.foreground, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
              Wordmark
            </Text>
            <Text style={{ fontSize: 8, color: colors.muted, fontFamily: "Courier" }}>
              Text only. Navigation bars, co-branding.
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.subsectionTitle}>Navbar Usage</Text>
      <View style={styles.subsectionDivider} />
      <Text style={styles.paragraph}>
        In the V2 navigation bar, the logo is displayed at full color (no
        filters) alongside the uppercase CLASHWARE wordmark in monospace.
        A system status indicator &quot;SYS.ONLINE&quot; follows the logo group.
      </Text>

      <PageFooter page={3} />
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>// Section 03</Text>
      <Text style={styles.sectionTitle}>Color System</Text>
      <View style={styles.sectionDivider} />

      <Text style={styles.paragraph}>
        The V2 palette is strictly monochromatic with surgical accent color.
        Swiss Red is used only for critical interaction points, active states,
        and 1-2px accent lines. Product colors appear only as ambient glows.
      </Text>

      <Text style={styles.subsectionTitle}>Brand Accent</Text>
      <View style={styles.subsectionDivider} />
      <View style={styles.colorGrid}>
        <ColorCard color={colors.brand} name="Swiss Red" hex="#DC2626" token="--color-brand" />
        <ColorCard color={colors.brandLight} name="Accent Light" hex="#F97316" token="--color-brand-light" />
        <ColorCard color={colors.brandDark} name="Accent Dark" hex="#991B1B" token="--color-brand-dark" />
      </View>

      <Text style={styles.subsectionTitle}>Surfaces</Text>
      <View style={styles.subsectionDivider} />
      <View style={styles.colorGrid}>
        <ColorCard color={colors.background} name="Background" hex="#0A0A0F" token="--color-background" />
        <ColorCard color="#18181B" name="Elevated" hex="#18181B" token="--color-secondary" />
        <ColorCard color={colors.border} name="Border" hex="#27272A" token="--color-border" />
      </View>

      <Text style={styles.subsectionTitle}>Text</Text>
      <View style={styles.subsectionDivider} />
      <View style={styles.colorGrid}>
        <ColorCard color={colors.foreground} name="Primary" hex="#FAFAFA" token="--color-foreground" />
        <ColorCard color={colors.muted} name="Muted" hex="#A1A1AA" token="--color-muted-foreground" />
      </View>

      <Text style={styles.subsectionTitle}>Product Glows</Text>
      <View style={styles.subsectionDivider} />
      <Text style={styles.monoText}>
        Used as ambient radial-gradient backgrounds only, never as solid fills.
      </Text>
      <View style={styles.colorGrid}>
        <ColorCard color={colors.lengthen} name="Lengthen" hex="#3B82F6" token="--color-product-lengthen" />
        <ColorCard color={colors.metacube} name="Metacube" hex="#22C55E" token="--color-product-metacube" />
        <ColorCard color={colors.bonega} name="Bonega" hex="#A855F7" token="--color-product-bonega" />
        <ColorCard color={colors.coira} name="Coira" hex="#10B981" token="--color-product-coira" />
      </View>

      <PageFooter page={4} />
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>// Section 04</Text>
      <Text style={styles.sectionTitle}>Typography</Text>
      <View style={styles.sectionDivider} />

      <Text style={styles.paragraph}>
        V2 uses a dual-font system. Inter for readability and body content.
        Geist Mono for all technical metadata, labels, indices, and UI
        controls. This creates a distinctive editorial contrast.
      </Text>

      <Text style={styles.subsectionTitle}>Inter (Sans-Serif)</Text>
      <View style={styles.subsectionDivider} />
      <Text style={styles.paragraph}>
        Primary typeface for headings, body text, and long-form content.
        Used with tight tracking on display sizes (letter-spacing: -0.02em).
      </Text>
      <View style={styles.card}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.foreground, marginBottom: 8, letterSpacing: -0.5 }}>
          CLASHWARE
        </Text>
        <Text style={{ fontSize: 11, color: colors.muted, marginBottom: 4 }}>
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </Text>
        <Text style={{ fontSize: 11, color: colors.muted }}>
          abcdefghijklmnopqrstuvwxyz 0123456789
        </Text>
      </View>

      <Text style={styles.subsectionTitle}>Geist Mono (Monospace)</Text>
      <View style={styles.subsectionDivider} />
      <Text style={styles.paragraph}>
        Used for: navigation labels, section indices (01, 02, 03), metadata,
        system status text, button labels, tags, timestamps, and technical
        readouts. Always uppercase with wide tracking.
      </Text>
      <View style={styles.card}>
        <Text style={{ fontSize: 11, color: colors.foreground, fontFamily: "Courier", marginBottom: 8, letterSpacing: 2 }}>
          [SYS.ONLINE] // MODULE: 01
        </Text>
        <Text style={{ fontSize: 9, color: colors.muted, fontFamily: "Courier", letterSpacing: 1, marginBottom: 4 }}>
          PRODUCTS | ABOUT | CONTACT | GET IN TOUCH
        </Text>
        <Text style={{ fontSize: 9, color: colors.muted, fontFamily: "Courier", letterSpacing: 1 }}>
          EPFL ENGINEERING ALUMNI | CHE-178.795.076
        </Text>
      </View>

      <Text style={styles.subsectionTitle}>Type Hierarchy</Text>
      <View style={styles.subsectionDivider} />
      <View style={styles.card}>
        <SpecRow label="Display (H1)" value="text-6xl to text-8xl / Bold / tracking-tight / Inter" />
        <SpecRow label="Section Title (H2)" value="text-4xl to text-5xl / Bold / uppercase / Inter" />
        <SpecRow label="Subsection (H3)" value="text-2xl / Medium / uppercase / Inter" />
        <SpecRow label="Body" value="text-base / Regular / Inter" />
        <SpecRow label="Overline" value="text-xs / Geist Mono / uppercase / tracking-widest / #DC2626" />
        <SpecRow label="Metadata" value="text-[10px] / Geist Mono / uppercase / tracking-wider / #A1A1AA" />
        <SpecRow label="Nav Links" value="text-xs / Geist Mono / uppercase / tracking-widest" />
      </View>

      <PageFooter page={5} />
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>// Section 05</Text>
      <Text style={styles.sectionTitle}>UI Components</Text>
      <View style={styles.sectionDivider} />

      <Text style={styles.subsectionTitle}>Buttons</Text>
      <View style={styles.subsectionDivider} />
      <View style={styles.card}>
        <SpecRow label="Border Radius" value="0px (rounded-none)" />
        <SpecRow label="Primary" value="bg #DC2626, text #FAFAFA, font-mono uppercase" />
        <SpecRow label="Outline" value="border #27272A, bg transparent, font-mono" />
        <SpecRow label="Default" value="bg #FAFAFA, text #0A0A0F (inverted)" />
        <SpecRow label="Transition" value="cubic-bezier(0.16, 1, 0.3, 1), 200ms" />
      </View>

      <Text style={styles.subsectionTitle}>Cards &amp; Panels</Text>
      <View style={styles.subsectionDivider} />
      <View style={styles.card}>
        <SpecRow label="Border" value="1px solid #27272A" />
        <SpecRow label="Background" value="Transparent or #18181B" />
        <SpecRow label="Shadow" value="None. Never." />
        <SpecRow label="Hover" value="bg #18181B, left accent line #DC2626" />
        <SpecRow label="Corner Accents" value="Optional 2px Swiss Red border pieces at corners" />
      </View>

      <Text style={styles.subsectionTitle}>Navigation</Text>
      <View style={styles.subsectionDivider} />
      <View style={styles.card}>
        <SpecRow label="Style" value="Edge-to-edge industrial system bar" />
        <SpecRow label="Separators" value="1px vertical lines (#27272A) between sections" />
        <SpecRow label="Active State" value="2px bottom line in #DC2626, scale-x from left" />
        <SpecRow label="Status" value="SYS.ONLINE indicator with pulsing red dot" />
        <SpecRow label="Links" value="font-mono text-xs uppercase tracking-widest" />
      </View>

      <Text style={styles.subsectionTitle}>Error States</Text>
      <View style={styles.subsectionDivider} />
      <Text style={styles.paragraph}>
        Error pages use a terminal-style readout aesthetic. Example:
        [ERR_404] with blinking cursor, sharp red borders, and monospace
        typography. Errors are brand-building moments, not apologies.
      </Text>

      <PageFooter page={6} />
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>// Section 06</Text>
      <Text style={styles.sectionTitle}>Motion &amp; Interaction</Text>
      <View style={styles.sectionDivider} />

      <Text style={styles.subsectionTitle}>Animation Philosophy</Text>
      <View style={styles.subsectionDivider} />
      <Text style={styles.paragraph}>
        Motion must be intentional, performant, and physics-based. Elements
        snap into place with mechanical precision. No bouncy easings, no
        floating animations, no gratuitous movement.
      </Text>

      <View style={styles.card}>
        <SpecRow label="Default Easing" value="cubic-bezier(0.16, 1, 0.3, 1)" />
        <SpecRow label="Hover Duration" value="200ms" />
        <SpecRow label="Page Transitions" value="500ms, opacity + translateY" />
        <SpecRow label="Reduced Motion" value="All animations disabled via prefers-reduced-motion" />
      </View>

      <Text style={styles.subsectionTitle}>ParticleField (Hero Background)</Text>
      <View style={styles.subsectionDivider} />
      <Text style={styles.paragraph}>
        The hero features an interactive canvas particle system with:
        magnetic vortex mouse tracking, click shockwave explosions, parallax
        depth layers, and additive blending glow. Particles respond to cursor
        proximity by growing brighter and shifting to white-hot. A 40%
        dark overlay ensures text remains readable above the particles.
      </Text>

      <View style={styles.card}>
        <SpecRow label="Particles" value="Up to 180 (desktop), 100 (mobile)" />
        <SpecRow label="Mouse Effect" value="Vortex swirl + brightness boost + connection lines" />
        <SpecRow label="Click Effect" value="Expanding shockwave ring (Swiss Red)" />
        <SpecRow label="Ambient" value="Sine-wave flow field, slow breathing motion" />
        <SpecRow label="Colors" value="#DC2626, #F97316, #FF3C00, #991B1B" />
      </View>

      <Text style={styles.subsectionTitle}>Micro-Interactions</Text>
      <View style={styles.subsectionDivider} />
      <View style={styles.card}>
        <SpecRow label="Button Hover" value="Instant border brightness change" />
        <SpecRow label="Card Hover" value="bg shift to #18181B, left accent turns #DC2626" />
        <SpecRow label="Link Hover" value="1px underline slides from left (scaleX 0 to 1)" />
        <SpecRow label="Input Focus" value="Border snaps to #FAFAFA, no soft ring" />
        <SpecRow label="Terminal Cursor" value="Blinking underscore, step-end timing" />
      </View>

      <PageFooter page={7} />
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionNumber}>// Section 07</Text>
      <Text style={styles.sectionTitle}>Usage Guidelines</Text>
      <View style={styles.sectionDivider} />

      <View style={styles.gridRow}>
        <View style={styles.gridCol}>
          <Text style={styles.subsectionTitle}>Do</Text>
          <View style={styles.subsectionDivider} />
          <View style={styles.listItem}>
            <View style={styles.checkMark} />
            <Text style={styles.listText}>Use dark backgrounds only (#0A0A0F)</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.checkMark} />
            <Text style={styles.listText}>Keep all corners sharp (0px radius)</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.checkMark} />
            <Text style={styles.listText}>Use Geist Mono for metadata and labels</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.checkMark} />
            <Text style={styles.listText}>Use 1px borders for structure and depth</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.checkMark} />
            <Text style={styles.listText}>Apply Swiss Red sparingly (accents only)</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.checkMark} />
            <Text style={styles.listText}>Maintain WCAG AAA text contrast</Text>
          </View>
        </View>

        <View style={styles.gridCol}>
          <Text style={styles.subsectionTitle}>Don&apos;t</Text>
          <View style={styles.subsectionDivider} />
          <View style={styles.listItem}>
            <View style={styles.xMark} />
            <Text style={styles.listText}>Use rounded corners or border-radius</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.xMark} />
            <Text style={styles.listText}>Add drop shadows or glassmorphism</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.xMark} />
            <Text style={styles.listText}>Use Swiss Red as large color blocks</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.xMark} />
            <Text style={styles.listText}>Apply bouncy or slow easing curves</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.xMark} />
            <Text style={styles.listText}>Use light mode backgrounds</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.xMark} />
            <Text style={styles.listText}>Invert or filter the logo colors</Text>
          </View>
        </View>
      </View>

      <Text style={styles.subsectionTitle}>Brand Voice</Text>
      <View style={styles.subsectionDivider} />
      <View style={styles.card}>
        <View style={styles.gridRow}>
          <View style={styles.gridCol}>
            <Text style={{ fontSize: 9, fontWeight: "bold", color: colors.foreground, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
              Tone
            </Text>
            <Text style={{ fontSize: 8, color: colors.muted, lineHeight: 1.6 }}>
              Precise, confident, technical. We speak like engineers,
              not marketers. No hype words, no superlatives.
            </Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={{ fontSize: 9, fontWeight: "bold", color: colors.foreground, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
              Forbidden Words
            </Text>
            <Text style={{ fontSize: 8, color: colors.muted, fontFamily: "Courier", lineHeight: 1.6 }}>
              leverage, delve, robust, seamless, cutting-edge, game-changer,
              holistic, paradigm, ecosystem
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.subsectionTitle}>Contact</Text>
      <View style={styles.subsectionDivider} />
      <View style={styles.cardDark}>
        <Text style={styles.monoText}>CONTACT: contact@clashware.com</Text>
        <Text style={styles.monoText}>ADDRESS: Avenue de Jurigoz 15, 1006 Lausanne, Switzerland</Text>
        <Text style={styles.monoText}>REGISTRY: CHE-178.795.076</Text>
        <Text style={styles.monoText}>WEB: clashware.com</Text>
      </View>

      <PageFooter page={8} />
    </Page>
  </Document>
);

export default BrandGuidelinesPDF;
