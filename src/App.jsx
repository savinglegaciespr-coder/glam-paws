import { useState, useCallback } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const LOGO = "data:image/jpeg;base64,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";

const C = {
  purple:     "#5B2D8E",
  purpleLight:"#7B4DB0",
  purplePale: "#EDE4F7",
  pink:       "#F2A7B8",
  pinkLight:  "#F9D4DC",
  pinkPale:   "#FFF0F4",
  gold:       "#C9A84C",
  goldLight:  "#F0DFA0",
  white:      "#FFFFFF",
  text:       "#2D1245",
  textMid:    "#6B5080",
  textLight:  "#A889C0",
  border:     "#E8D5F0",
  success:    "#4CAF82",
  danger:     "#E05C7A",
  warn:       "#F0A030",
};

const SERVICES = ["grooming", "daycare", "hotel", "pet_taxi"];
const SERVICE_LABELS = {
  grooming: "✂️ Grooming",
  daycare:  "🐾 Day Care",
  hotel:    "🏨 Pet Hotel",
  pet_taxi: "🚗 Pet Taxi",
};

const INIT_REVENUES = { grooming: "", daycare: "", hotel: "", pet_taxi: "" };
const INIT_EXPENSES = { renta: "", electricidad: "", agua: "", internet: "", seguro: "", suministros: "", marketing: "", otros: "" };
const EMPTY_EMPLOYEE = () => ({ id: Date.now() + Math.random(), name: "", role: "", type: "1099", salary: "", hours: 40 });
const INIT_EMPLOYEES = Array.from({ length: 6 }, EMPTY_EMPLOYEE);

const PATRONAL_RATE = 0.172;
const currency = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n || 0);
const pct = (n) => `${(n * 100).toFixed(1)}%`;
const TABS = ["💰 Ingresos", "👥 Nómina", "📊 Análisis", "📈 Proyección"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "10px 16px", boxShadow: "0 4px 20px rgba(91,45,142,0.12)" }}>
      <p style={{ color: C.purple, fontWeight: 700, marginBottom: 4, fontSize: 13 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 12, margin: "2px 0" }}>{p.name}: {currency(p.value)}</p>
      ))}
    </div>
  );
};

export default function GlamPawsDashboard() {
  const [tab, setTab] = useState(0);
  const [revenues, setRevenues] = useState(INIT_REVENUES);
  const [expenses, setExpenses] = useState(INIT_EXPENSES);
  const [employees, setEmployees] = useState(INIT_EMPLOYEES);
  const [showReset, setShowReset] = useState(false);

  const handleReset = () => {
    setRevenues(INIT_REVENUES);
    setExpenses(INIT_EXPENSES);
    setEmployees(Array.from({ length: 6 }, EMPTY_EMPLOYEE));
    setTab(0);
    setShowReset(false);
  };

  const totalRevenue = SERVICES.reduce((s, k) => s + (parseFloat(revenues[k]) || 0), 0);
  const totalExpenses = Object.values(expenses).reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const employeeCosts = employees.map(e => {
    const base = parseFloat(e.salary) || 0;
    const carga = e.type === "w2" ? base * PATRONAL_RATE : 0;
    return { ...e, base, carga, total: base + carga };
  });
  const totalPayroll = employeeCosts.reduce((s, e) => s + e.total, 0);
  const totalCost = totalExpenses + totalPayroll;
  const netProfit = totalRevenue - totalCost;
  const margin = totalRevenue > 0 ? netProfit / totalRevenue : 0;
  const statusColor = netProfit >= 0 ? C.success : C.danger;
  const statusLabel = netProfit >= 0 ? "✅ Rentable" : "⚠️ Déficit";

  const scenarios = [
    { label: "Conservador", rate: 0.02, color: C.pink },
    { label: "Moderado",    rate: 0.05, color: C.purple },
    { label: "Agresivo",    rate: 0.09, color: C.gold },
  ];
  const projData = Array.from({ length: 12 }, (_, i) => {
    const mo = { mes: `M${i + 1}` };
    scenarios.forEach(sc => { mo[sc.label] = Math.round(totalRevenue * Math.pow(1 + sc.rate, i + 1)); });
    return mo;
  });

  const setEmp = useCallback((id, field, value) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  }, []);
  const addEmployee = () => setEmployees(prev => [...prev, EMPTY_EMPLOYEE()]);
  const removeEmployee = (id) => setEmployees(prev => prev.filter(e => e.id !== id));

  const inp = { width: "100%", padding: "9px 12px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, color: C.text, outline: "none", fontFamily: "inherit", background: C.pinkPale, boxSizing: "border-box" };
  const sel = { ...inp, cursor: "pointer" };
  const lbl = { color: C.textMid, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 5 };
  const secTitle = { color: C.purple, fontSize: 15, fontWeight: 700, marginBottom: 16, paddingBottom: 8, borderBottom: `2px solid ${C.pinkLight}` };
  const chip = { background: C.purplePale, color: C.purple, padding: "5px 10px", borderRadius: 10, fontSize: 12, fontWeight: 700, marginTop: 6, display: "inline-block" };
  const badge = (t) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: t === "w2" ? C.purplePale : C.goldLight, color: t === "w2" ? C.purple : "#7A5800" });
  const metricRow = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}` };

  const revBarData = SERVICES.map(k => ({ name: SERVICE_LABELS[k].split(" ")[1], Ingresos: parseFloat(revenues[k]) || 0 }));
  const payrollBar = employeeCosts.filter(e => e.base > 0).map(e => ({ name: e.name || "Sin nombre", Salario: e.base, Carga: e.carga }));

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: `linear-gradient(135deg, ${C.pinkPale} 0%, ${C.purplePale} 100%)`, minHeight: "100vh", paddingBottom: 60 }}>

      {/* RESET CONFIRM MODAL */}
      {showReset && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: C.white, borderRadius: 20, padding: "32px 28px", maxWidth: 360, width: "100%", textAlign: "center", boxShadow: "0 8px 40px rgba(91,45,142,0.25)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔄</div>
            <h3 style={{ color: C.purple, margin: "0 0 8px", fontSize: 18 }}>¿Resetear el panel?</h3>
            <p style={{ color: C.textMid, fontSize: 14, margin: "0 0 24px" }}>Se borrarán todos los datos ingresados. Esta acción no se puede deshacer.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setShowReset(false)} style={{ padding: "10px 24px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.white, color: C.textMid, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
              <button onClick={handleReset} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: C.danger, color: C.white, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Sí, resetear</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${C.purple} 0%, ${C.purpleLight} 60%, ${C.pink} 100%)`, padding: "20px 20px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 4px 24px rgba(91,45,142,0.25)", flexWrap: "wrap" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 12px rgba(0,0,0,0.25)", border: "2px solid rgba(255,255,255,0.4)" }}>
          <img src={LOGO} alt="Glam Paws" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <p style={{ color: C.white, fontSize: 20, fontWeight: 700, margin: 0 }}>Glam Paws</p>
          <p style={{ color: C.pinkLight, fontSize: 12, margin: "2px 0 0", fontStyle: "italic" }}>Panel Financiero · Pet Lovers Sitting</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
          <span style={{ display: "inline-block", padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: netProfit >= 0 ? "#dcfce7" : "#fee2e2", color: C.purple }}>{statusLabel}</span>
          <button onClick={() => setShowReset(true)} style={{ background: "rgba(255,255,255,0.25)", color: C.danger, border: "none", borderRadius: 10, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>🔄 Reset</button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, padding: "16px 14px 0" }}>
        {[
          { label: "Ingresos",    value: currency(totalRevenue),  sub: "este mes",         color: C.purple },
          { label: "Gastos",      value: currency(totalCost),     sub: "nómina + fijos",   color: C.danger },
          { label: "Utilidad",    value: currency(netProfit),     sub: pct(margin) + " margen", color: statusColor },
          { label: "Equilibrio",  value: currency(totalCost),     sub: "mínimo necesario", color: C.warn },
        ].map((k, i) => (
          <div key={i} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", boxShadow: "0 2px 10px rgba(91,45,142,0.08)", border: `1.5px solid ${C.border}` }}>
            <div style={{ color: C.textLight, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{k.label}</div>
            <div style={{ color: k.color, fontSize: 20, fontWeight: 800, margin: "4px 0 2px" }}>{k.value}</div>
            <div style={{ color: C.textMid, fontSize: 11 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: 2, padding: "16px 14px 0", overflowX: "auto" }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{ padding: "9px 14px", borderRadius: "10px 10px 0 0", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: tab === i ? C.white : "transparent", color: tab === i ? C.purple : C.textMid, whiteSpace: "nowrap", transition: "all 0.2s", borderBottom: tab === i ? `3px solid ${C.purple}` : "none" }}>{t}</button>
        ))}
      </div>

      {/* PANEL */}
      <div style={{ background: C.white, margin: "0 14px", borderRadius: "0 0 18px 18px", padding: "20px 16px", boxShadow: "0 4px 20px rgba(91,45,142,0.08)" }}>

        {/* TAB: INGRESOS */}
        {tab === 0 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
              <div>
                <div style={secTitle}>🌸 Ingresos por Servicio</div>
                {SERVICES.map(k => (
                  <div key={k} style={{ marginBottom: 12 }}>
                    <label style={lbl}>{SERVICE_LABELS[k]}</label>
                    <input style={inp} type="number" placeholder="$0.00" value={revenues[k]} onChange={e => setRevenues(r => ({ ...r, [k]: e.target.value }))} />
                  </div>
                ))}
                <div style={{ background: C.purplePale, borderRadius: 12, padding: "14px 16px", marginTop: 8 }}>
                  <div style={{ color: C.textMid, fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>Total Ingresos</div>
                  <div style={{ color: C.purple, fontSize: 24, fontWeight: 800 }}>{currency(totalRevenue)}</div>
                </div>
              </div>
              <div>
                <div style={secTitle}>🏠 Gastos Fijos Mensuales</div>
                {Object.keys(expenses).map(k => (
                  <div key={k} style={{ marginBottom: 12 }}>
                    <label style={lbl}>{k.charAt(0).toUpperCase() + k.slice(1)}</label>
                    <input style={inp} type="number" placeholder="$0.00" value={expenses[k]} onChange={e => setExpenses(ex => ({ ...ex, [k]: e.target.value }))} />
                  </div>
                ))}
                <div style={{ background: `${C.pink}33`, borderRadius: 12, padding: "14px 16px", marginTop: 8 }}>
                  <div style={{ color: C.textMid, fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>Total Gastos Fijos</div>
                  <div style={{ color: C.danger, fontSize: 22, fontWeight: 800 }}>{currency(totalExpenses)}</div>
                </div>
              </div>
            </div>
            {totalRevenue > 0 && (
              <div style={{ marginTop: 20 }}>
                <div style={secTitle}>📊 Desglose de Ingresos</div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={revBarData} barSize={32}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.textMid }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Ingresos" fill={C.purple} radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* TAB: NÓMINA */}
        {tab === 1 && (
          <div>
            <div style={secTitle}>👥 Empleados y Contratistas</div>
            {employees.map((emp, idx) => {
              const ec = employeeCosts.find(e => e.id === emp.id) || emp;
              return (
                <div key={emp.id} style={{ background: C.pinkPale, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10, position: "relative" }}>
                  <button onClick={() => removeEmployee(emp.id)} style={{ position: "absolute", top: 10, right: 12, background: "none", border: "none", cursor: "pointer", color: C.textLight, fontSize: 18, lineHeight: 1 }}>×</button>
                  <div style={{ color: C.textLight, fontSize: 10, fontWeight: 700, marginBottom: 8 }}>EMPLEADO #{idx + 1}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}>
                    <div><label style={lbl}>Nombre</label><input style={inp} placeholder="Nombre completo" value={emp.name} onChange={e => setEmp(emp.id, "name", e.target.value)} /></div>
                    <div><label style={lbl}>Puesto</label><input style={inp} placeholder="Groomer…" value={emp.role} onChange={e => setEmp(emp.id, "role", e.target.value)} /></div>
                    <div>
                      <label style={lbl}>Tipo</label>
                      <select style={sel} value={emp.type} onChange={e => setEmp(emp.id, "type", e.target.value)}>
                        <option value="1099">1099 Contratista</option>
                        <option value="w2">W-2 Empleado</option>
                      </select>
                    </div>
                    <div><label style={lbl}>Salario/mes</label><input style={inp} type="number" placeholder="$0.00" value={emp.salary} onChange={e => setEmp(emp.id, "salary", e.target.value)} /></div>
                    <div><label style={lbl}>Hrs/semana</label><input style={inp} type="number" placeholder="40" value={emp.hours} onChange={e => setEmp(emp.id, "hours", e.target.value)} /></div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={badge(emp.type)}>{emp.type === "w2" ? "W-2 · Con cargas" : "1099 · Sin cargas"}</span>
                    {ec.base > 0 && (
                      <>
                        <span style={chip}>Salario: {currency(ec.base)}</span>
                        {ec.carga > 0 && <span style={{ ...chip, background: `${C.pink}44`, color: C.danger }}>Carga: {currency(ec.carga)}</span>}
                        <span style={{ ...chip, fontWeight: 800 }}>Total: {currency(ec.total)}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, flexWrap: "wrap", gap: 12 }}>
              <button onClick={addEmployee} style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`, color: C.white, border: "none", borderRadius: 12, padding: "11px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 3px 12px rgba(91,45,142,0.25)" }}>+ Añadir Empleado</button>
              <div style={{ background: C.purplePale, borderRadius: 12, padding: "12px 18px", textAlign: "right" }}>
                <div style={{ color: C.textMid, fontSize: 11, fontWeight: 600 }}>COSTO TOTAL NÓMINA</div>
                <div style={{ color: C.purple, fontSize: 22, fontWeight: 800 }}>{currency(totalPayroll)}</div>
                <div style={{ color: C.textLight, fontSize: 11 }}>{totalRevenue > 0 ? pct(totalPayroll / totalRevenue) + " de ingresos" : "—"}</div>
              </div>
            </div>
            {payrollBar.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <div style={secTitle}>📊 Costo por Empleado</div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={payrollBar} barSize={24}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="Salario" stackId="a" fill={C.purple} />
                    <Bar dataKey="Carga" stackId="a" fill={C.pink} radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* TAB: ANÁLISIS */}
        {tab === 2 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            <div style={{ background: C.white, border: `2px solid ${C.purple}`, borderRadius: 16, padding: "18px 20px" }}>
              <div style={secTitle}>🏥 Estado del Negocio</div>
              {[
                { label: "Ingresos totales",     value: currency(totalRevenue),  color: C.success },
                { label: "Gastos fijos",          value: currency(totalExpenses), color: C.danger },
                { label: "Nómina total",          value: currency(totalPayroll),  color: C.warn },
                { label: "Costo operativo",       value: currency(totalCost),     color: C.danger },
                { label: "Utilidad neta",         value: currency(netProfit),     color: statusColor },
                { label: "Margen operativo",      value: pct(margin),             color: statusColor },
              ].map((row, i) => (
                <div key={i} style={metricRow}>
                  <span style={{ color: C.textMid, fontSize: 13 }}>{row.label}</span>
                  <span style={{ color: row.color, fontSize: 14, fontWeight: 700 }}>{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{ background: C.white, border: `2px solid ${C.pink}`, borderRadius: 16, padding: "18px 20px" }}>
              <div style={secTitle}>🐕 ¿Puedo Contratar?</div>
              {(() => {
                const active = employeeCosts.filter(e => e.base > 0);
                const avgBase = active.length > 0 ? totalPayroll / active.length : 1500;
                const newCost = avgBase * (1 + PATRONAL_RATE);
                const petsNeeded = Math.ceil(newCost / 65);
                const canHire = netProfit > newCost;
                return (
                  <>
                    <div style={{ background: canHire ? `${C.success}18` : `${C.danger}18`, borderRadius: 12, padding: "14px 16px", marginBottom: 16, textAlign: "center" }}>
                      <div style={{ fontSize: 32 }}>{canHire ? "✅" : "⚠️"}</div>
                      <div style={{ color: canHire ? C.success : C.danger, fontWeight: 800, fontSize: 14, marginTop: 4 }}>
                        {canHire ? "Puedes contratar" : "Aún no es el momento"}
                      </div>
                    </div>
                    {[
                      { label: "Costo nuevo empleado",   value: currency(newCost) },
                      { label: "Servicios adicionales",  value: `~${petsNeeded}/mes` },
                      { label: "Ticket promedio",        value: currency(65) },
                      { label: "Utilidad disponible",    value: currency(netProfit), color: statusColor },
                    ].map((row, i) => (
                      <div key={i} style={metricRow}>
                        <span style={{ color: C.textMid, fontSize: 13 }}>{row.label}</span>
                        <span style={{ color: row.color || C.text, fontSize: 14, fontWeight: 700 }}>{row.value}</span>
                      </div>
                    ))}
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB: PROYECCIÓN */}
        {tab === 3 && (
          <div>
            <div style={secTitle}>📈 Proyección de Ingresos a 12 Meses</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              {scenarios.map((sc, i) => (
                <div key={i} style={{ background: C.pinkPale, border: `2px solid ${sc.color}`, borderRadius: 12, padding: "10px 16px", flex: 1, minWidth: 120 }}>
                  <div style={{ color: sc.color, fontWeight: 700, fontSize: 13 }}>{sc.label}</div>
                  <div style={{ color: C.textMid, fontSize: 11 }}>+{(sc.rate * 100).toFixed(0)}% / mes</div>
                  <div style={{ color: C.text, fontWeight: 800, fontSize: 14, marginTop: 4 }}>{currency(totalRevenue * Math.pow(1 + sc.rate, 12))}</div>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={projData}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} width={55} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {scenarios.map(sc => (
                  <Line key={sc.label} type="monotone" dataKey={sc.label} stroke={sc.color} strokeWidth={2.5} dot={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 20 }}>
              {[3, 6, 12].map(mo => (
                <div key={mo} style={{ background: C.pinkPale, borderRadius: 12, padding: "14px 16px", border: `1.5px solid ${C.border}` }}>
                  <div style={{ color: C.textMid, fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Mes {mo}</div>
                  {scenarios.map(sc => (
                    <div key={sc.label} style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                      <span style={{ color: sc.color, fontSize: 11, fontWeight: 600 }}>{sc.label}</span>
                      <span style={{ color: C.text, fontSize: 12, fontWeight: 700 }}>{currency(totalRevenue * Math.pow(1 + sc.rate, mo))}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", marginTop: 28, color: C.textLight, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <img src={LOGO} alt="" style={{ width: 20, height: 20, borderRadius: "50%", objectFit: "cover" }} />
        Glam Paws · Panel Financiero — cálculos mensuales
      </div>
    </div>
  );
}
