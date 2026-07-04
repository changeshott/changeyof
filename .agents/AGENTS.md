<!-- BEGIN:monochrome-saas-style-rule -->
# Monochrome SaaS Style Guidelines

The user has explicitly defined a premium "Monochrome SaaS" aesthetic for this project. When creating new components or pages, strictly adhere to the following design rules to maintain consistency:

1. **No Vibrant Colors**: Completely avoid `purple`, `indigo`, `rose`, or other vibrant colors for backgrounds, glows, borders, and text unless explicitly asked.
2. **Color Palette**: Use exclusively monochrome tones:
   - Whites: `white`, `white/5`, `white/50`, etc.
   - Blacks/Darks: `black`, `#111`, `#0a0a0a`
   - Neutrals: `slate-50` to `slate-900`
3. **Gradients**: Use stark, clean gradients (e.g., `from-white to-white/60` for text, `from-slate-200 to-white` for backgrounds).
4. **Glows and Shadows**: Replace colored glows (e.g., `rgba(99,102,241,0.4)`) with subtle monochrome glows (`rgba(255,255,255,0.05)`, `rgba(0,0,0,0.1)`).
5. **UI Accents**: Active states, badges, and prominent buttons should rely on stark contrast (e.g., `bg-white text-black` on dark mode, or `bg-slate-900 text-white` on light mode) rather than accent colors.
<!-- END:monochrome-saas-style-rule -->

<!-- BEGIN:project-system-style-guidelines -->
# Project System Style Guidelines

Based on the current project's configuration and UI, adhere to the following tokens and components to ensure consistency across the SaaS system.

## Typography
- **Sans-Serif Font**: `Outfit` (used via `--font-sans`).
- **Monospace Font**: `Geist_Mono` (used via `--font-mono`).

## Global Color Tokens
Although the project is primarily monochrome (following the `Monochrome SaaS` rule), the following global tokens are established in the core configuration (`globals.css`):
- **Background**: `var(--background)` defined as `#050505`.
- **Foreground**: `var(--foreground)` defined as `#fafafa`.
- **Surface**: `var(--color-surface)` defined as `rgba(5, 5, 5, 0.90)`. This provides a near-solid black to block background lights when using glassmorphism.
- **Surface Border**: `var(--color-surface-border)` defined as `rgba(255, 255, 255, 0.08)`.

*(Note: There are legacy tokens like `--color-brand: #6366f1` (Indigo) in the codebase. You MUST prioritize the `Monochrome SaaS` rules over these legacy vibrant colors unless explicitly requested).*

## UI Elements & Micro-Animations
- **Glassmorphism**: Use the utility class `.glass` for components requiring depth. It applies the surface background with a 24px blur and surface border.
- **Scrollbars**: By default, global scrollbars are hidden. Use the `.custom-scrollbar` class on specific containers (like sidebars) to apply a thin, customized scrollbar (`4px` width, transparent track, white/10 thumb).
- **Curtain Background**: Use the `.bg-curtain` class for dynamic backgrounds (e.g., hero sections). It uses a 20s infinite gradient animation moving across deep dark tones.
- **Wave & Shimmer**: Keyframes `waveX` (0 to -50% translation) and `shimmer` (-100% to 200% translation) are available for loading states or dynamic hover effects.
<!-- END:project-system-style-guidelines -->
