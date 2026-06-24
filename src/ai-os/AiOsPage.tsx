import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  CircleGauge,
  Database,
  ExternalLink,
  FileCheck2,
  FolderGit2,
  Github,
  Laptop,
  Mail,
  Map,
  MessagesSquare,
  Network,
  RefreshCcw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useEffect } from "react";
import "./AiOsPage.scss";

const TELEGRAM_URL = "https://t.me/a1gorithms";
const EMAIL_URL =
  "mailto:actingsv@gmail.com?subject=AI%20OS%20Pilot&body=Расскажите%20кратко%20об%20ОС%2C%20железе%2C%20ИИ-инструментах%20и%20главной%20проблеме.%20Не%20отправляйте%20пароли%20или%20токены.";

const implementationSteps = [
  ["Аудит", "Железо, проекты, ИИ‑инструменты и риски."],
  ["Контекст", "Obsidian, репозитории и компактные context packs."],
  ["Исполнение", "Локальные модели, Codex и агенты по чётким маршрутам."],
  ["Приёмка", "Health gate, отчёт, runbook и restore dry‑run."],
] as const;

const deliverables = [
  [Map, "Карта системы и рисков"],
  [Workflow, "Маршруты для ИИ‑инструментов"],
  [Database, "Obsidian/RAG и context packs"],
  [CircleGauge, "Единый UI и мониторинг"],
  [ShieldCheck, "Health и security checks"],
  [FileCheck2, "Runbook и restore dry‑run"],
] as const;

const acceptanceCriteria = [
  "Контекст находится по контрольным запросам",
  "Секреты не попадают в отчёты",
  "UI и мониторинг доступны",
  "Восстановление проверено dry‑run",
] as const;

const proofSources = [
  {
    icon: Github,
    title: "system-bootstrap",
    text: "Install, restore и hardware layers",
    href: "https://github.com/goringich/system-bootstrap",
  },
  {
    icon: CircleGauge,
    title: "home-admin / Atlas",
    text: "Monitoring и readiness surface",
    href: "https://github.com/goringich/home-admin",
  },
  {
    icon: FileCheck2,
    title: "Architecture notes",
    text: "Runbooks и решения",
    href: "https://github.com/goringich/system-bootstrap/tree/codex/local-ai-stack-snapshot/docs/local-ai-stack",
  },
  {
    icon: ShieldCheck,
    title: "Acceptance report",
    text: "Проверяемый результат для клиента",
    href: "https://github.com/goringich/system-bootstrap/blob/codex/local-ai-stack-snapshot/docs/system-control-catalog.md",
  },
] as const;

function ProductButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const isExternal = href.startsWith("http");

  return (
    <a
      className={`aios-button aios-button--${variant}`}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function SystemNode({
  icon: Icon,
  label,
  tone = "cyan",
}: {
  icon: typeof Laptop;
  label: string;
  tone?: "cyan" | "violet";
}) {
  return (
    <div className={`aios-system-node aios-system-node--${tone}`}>
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function HeroSystemMap() {
  return (
    <div className="aios-system-map" aria-label="Схема компонентов AI OS">
      <div className="aios-system-map__computer">
        <SystemNode icon={Laptop} label="Ваш компьютер" />
      </div>
      <div className="aios-system-map__trunk" aria-hidden="true" />
      <div className="aios-system-map__primary">
        <SystemNode icon={FolderGit2} label="Проекты" />
        <SystemNode icon={Sparkles} label="Obsidian" tone="violet" />
        <SystemNode icon={Bot} label="ИИ‑агенты" />
      </div>
      <div className="aios-system-map__secondary">
        <SystemNode icon={Network} label="Локальные модели" tone="violet" />
        <SystemNode icon={CircleGauge} label="Atlas" tone="violet" />
        <SystemNode icon={RefreshCcw} label="Recovery" tone="violet" />
      </div>
    </div>
  );
}

function WorkflowFrame() {
  const stages = [
    { label: "Запрос", icon: MessagesSquare },
    { label: "Контекст проекта", icon: Database },
    { label: "ИИ‑исполнитель", icon: Bot },
    { label: "Проверка", icon: ShieldCheck },
    { label: "Отчёт", icon: FileCheck2 },
  ] as const;

  return (
    <div className="aios-workflow" aria-label="Поток выполнения задачи">
      {stages.map(({ label, icon: Icon }, index) => (
        <div className="aios-workflow__stage" key={label}>
          <span className="aios-workflow__label">{label}</span>
          <div className="aios-workflow__visual">
            <Icon aria-hidden="true" />
            <span />
            <span />
            <span />
          </div>
          {index < stages.length - 1 ? (
            <ChevronRight className="aios-workflow__arrow" aria-hidden="true" />
          ) : null}
        </div>
      ))}
      <div className="aios-workflow__tools">
        <span>Obsidian</span>
        <span>Git</span>
        <span>Ollama</span>
        <span>Open WebUI</span>
        <span>Atlas</span>
      </div>
    </div>
  );
}

function AiOsHeader() {
  return (
    <header className="aios-header">
      <a className="aios-brand" href="#top" aria-label="AI OS — наверх">
        AI <span>OS</span>
      </a>
      <nav className="aios-nav" aria-label="Навигация по странице AI OS">
        <a href="#how">Как работает</a>
        <a href="#pilot">Пилот</a>
        <a href="#proof">Доказательства</a>
      </nav>
      <ProductButton href="#contact" variant="secondary">
        <span className="aios-header__desktop-action">Обсудить пилот</span>
        <span className="aios-header__mobile-action">Пилот</span>
      </ProductButton>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="aios-hero" id="top">
      <div className="aios-hero__copy">
        <h1>Личная ИИ‑ОС на вашем компьютере</h1>
        <p>
          Настраиваю локальную систему, которая знает ваши проекты, находит нужный контекст,
          распределяет задачи между ИИ‑инструментами и оставляет проверяемый след.
        </p>
        <div className="aios-actions">
          <ProductButton href="#contact">
            Запустить пилот <ArrowRight aria-hidden="true" />
          </ProductButton>
          <ProductButton href="#how" variant="secondary">
            Посмотреть систему
          </ProductButton>
        </div>
        <div className="aios-proof-line" aria-label="Параметры пилота">
          <span>Linux workstation</span>
          <span>local-first</span>
          <span>5 рабочих дней</span>
        </div>
      </div>
      <HeroSystemMap />
    </section>
  );
}

function HowSection() {
  return (
    <section className="aios-section aios-how" id="how">
      <div className="aios-section-heading">
        <h2>Не новый чат. Рабочая система.</h2>
        <p>
          Собираю ваши существующие инструменты в один проверяемый контур. Данные остаются у
          вас, а каждое действие можно объяснить и восстановить.
        </p>
      </div>
      <div className="aios-how__layout">
        <ol className="aios-steps">
          {implementationSteps.map(([title, text], index) => (
            <li key={title}>
              <span className="aios-step-number">{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <WorkflowFrame />
      </div>
    </section>
  );
}

function PilotSection() {
  return (
    <section className="aios-section aios-pilot" id="pilot">
      <div className="aios-section-heading">
        <h2>Пилот за 5 рабочих дней</h2>
        <p>
          Один Linux workstation, до 3 активных проектов. После — рабочая система и пакет
          приёмки, а не презентация.
        </p>
      </div>
      <div className="aios-pilot__layout">
        <div className="aios-deliverables">
          <h3>Что будет сделано</h3>
          <ol>
            {deliverables.map(([Icon, label], index) => (
              <li key={label}>
                <span>{index + 1}</span>
                <Icon aria-hidden="true" />
                <strong>{label}</strong>
              </li>
            ))}
          </ol>
        </div>
        <article className="aios-offer" aria-labelledby="aios-offer-title">
          <h3 id="aios-offer-title">AI OS Pilot</h3>
          <div className="aios-offer__price">49 900 ₽</div>
          <p className="aios-offer__scope">1 workstation · до 3 проектов · 5 рабочих дней</p>
          <div className="aios-audit-entry">
            <Search aria-hidden="true" />
            <div>
              <strong>Диагностика — 9 900 ₽</strong>
              <span>Полностью засчитывается в стоимость пилота.</span>
            </div>
          </div>
          <h4>Критерии приёмки</h4>
          <ul className="aios-acceptance-list">
            {acceptanceCriteria.map((criterion) => (
              <li key={criterion}>
                <Check aria-hidden="true" /> {criterion}
              </li>
            ))}
          </ul>
          <ProductButton href="#contact">Оставить заявку</ProductButton>
          <p className="aios-offer__boundary">
            Без обещаний полной автономии. Данные и доступы остаются у вас.
          </p>
        </article>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="aios-section aios-proof" id="proof">
      <div className="aios-section-heading">
        <h2>Доказательства, а не обещания</h2>
        <p>
          Публичные исходники показывают, как устроены restore, health gate,
          hardware‑адаптация и мониторинг. Клиент получает такой же проверяемый acceptance
          report.
        </p>
      </div>
      <div className="aios-proof__layout">
        <article className="aios-acceptance-report">
          <header>
            <div>
              <FileCheck2 aria-hidden="true" />
              <h3>Platform acceptance</h3>
            </div>
            <strong>100 / 100</strong>
          </header>
          <ol>
            {[
              "Declared missing — 0",
              "Promote backlog — 0",
              "Secret risk — 0",
              "Restore dry‑run — verified",
            ].map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
                <Check aria-hidden="true" />
              </li>
            ))}
          </ol>
        </article>
        <div className="aios-source-list">
          <h3>Открытые доказательства</h3>
          {proofSources.map(({ icon: Icon, title, text, href }) => (
            <a href={href} target="_blank" rel="noreferrer" key={title}>
              <span className="aios-source-list__icon">
                <Icon aria-hidden="true" />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{text}</small>
              </span>
              <ExternalLink aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="aios-contact" id="contact">
      <div>
        <h2>Соберём ваши ИИ‑инструменты в систему.</h2>
        <p id="privacy">
          Начнём с короткой диагностики. Никаких паролей, токенов и приватных данных в заявке.
        </p>
      </div>
      <div className="aios-actions aios-contact__actions">
        <ProductButton href={TELEGRAM_URL}>
          <Send aria-hidden="true" /> Написать в Telegram
        </ProductButton>
        <ProductButton href={EMAIL_URL} variant="secondary">
          <Mail aria-hidden="true" /> Отправить email
        </ProductButton>
      </div>
    </section>
  );
}

function AiOsFooter() {
  return (
    <footer className="aios-footer">
      <span>
        <strong>AI OS</strong> by Igor Kim · local-first engineering
      </span>
      <nav aria-label="Ссылки в подвале">
        <a href="https://github.com/goringich" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="/">Портфолио</a>
        <a href="#privacy">Конфиденциальность</a>
      </nav>
    </footer>
  );
}

export function AiOsPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "AI OS — локальная ИИ‑система для разработчика";
    if (description) {
      description.content =
        "Внедрение локальной ИИ‑ОС: проекты, Obsidian/RAG, локальные модели, мониторинг и проверяемое восстановление.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) {
        description.content = previousDescription;
      }
    };
  }, []);

  return (
    <div className="aios-page">
      <div className="aios-page__background" aria-hidden="true" />
      <AiOsHeader />
      <main>
        <HeroSection />
        <HowSection />
        <PilotSection />
        <ProofSection />
        <ContactSection />
      </main>
      <AiOsFooter />
    </div>
  );
}
