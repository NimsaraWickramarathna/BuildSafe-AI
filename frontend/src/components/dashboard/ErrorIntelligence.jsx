import {
  AlertTriangle,
  ArrowRight,
  CircleAlert,
  Target,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const errorByViolationType = [
  {
    name: "Unknown",
    errors: 52,
  },
  {
    name: "Construction",
    errors: 45,
  },
  {
    name: "Plumbing",
    errors: 9,
  },
  {
    name: "Elevators",
    errors: 8,
  },
  {
    name: "Signs",
    errors: 6,
  },
  {
    name: "Cranes",
    errors: 4,
  },
  {
    name: "Zoning",
    errors: 1,
  },
];


const errorTransitions = [
  {
    actual: "Class 1",
    predicted: "Class 2",
    count: 46,
  },
  {
    actual: "Class 2",
    predicted: "Class 1",
    count: 77,
  },
  {
    actual: "Class 2",
    predicted: "Class 3",
    count: 1,
  },
  {
    actual: "Class 3",
    predicted: "Class 1",
    count: 1,
  },
];


function ErrorTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div
      className="
        rounded-xl
        border border-white/10
        bg-[#111827]
        px-4 py-3
        shadow-2xl
      "
    >
      <p className="text-xs font-semibold text-white">
        {label}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Errors:{" "}
        <span className="font-semibold text-white">
          {payload[0].value}
        </span>
      </p>
    </div>
  );
}


function ErrorMetric({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-white/6
        bg-white/2.5
        p-5
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {value}
          </p>

        </div>

        <div
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            bg-amber-500/8
          "
        >
          <Icon
            size={18}
            className="text-amber-400"
          />
        </div>

      </div>

      <p className="mt-3 text-[11px] text-slate-600">
        {description}
      </p>
    </div>
  );
}


export default function ErrorIntelligence() {
  return (
    <section className="mt-6">

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="mb-4">

        <div className="flex items-center gap-2">

          <AlertTriangle
            size={18}
            className="text-amber-400"
          />

          <h2 className="text-lg font-semibold text-white">
            Error Intelligence
          </h2>

        </div>

        <p className="mt-1 text-xs text-slate-600">
          Understanding where the tuned SVM makes incorrect
          severity predictions.
        </p>

      </div>


      {/* =====================================================
          ERROR METRICS
      ===================================================== */}

      <div
        className="
          grid
          gap-4
          sm:grid-cols-3
        "
      >

        <ErrorMetric
          icon={CircleAlert}
          label="Incorrect Predictions"
          value="125"
          description="Out of 20,564 test records"
        />

        <ErrorMetric
          icon={Target}
          label="Error Rate"
          value="0.6079%"
          description="Overall test-set error rate"
        />

        <ErrorMetric
          icon={AlertTriangle}
          label="Largest Error Source"
          value="Unknown"
          description="52 of the 125 incorrect predictions"
        />

      </div>


      {/* =====================================================
          ERROR ANALYSIS GRID
      ===================================================== */}

      <div
        className="
          mt-4
          grid
          gap-6
          xl:grid-cols-3
        "
      >

        {/* ===================================================
            ERRORS BY VIOLATION TYPE
        =================================================== */}

        <div
          className="
            rounded-2xl
            border border-white/6
            bg-[#111827]/60
            p-6
            xl:col-span-2
          "
        >

          <div className="mb-5">

            <p className="text-sm font-semibold text-white">
              Errors by Violation Type
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Number of incorrect predictions associated with
              each violation type.
            </p>

          </div>


          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={errorByViolationType}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 20,
                  left: 10,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  horizontal={false}
                  stroke="rgba(255,255,255,0.05)"
                />

                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{
                    fill: "#64748b",
                    fontSize: 10,
                  }}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={105}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 10,
                  }}
                />

                <Tooltip
                  content={<ErrorTooltip />}
                />

                <Bar
                  dataKey="errors"
                  fill="#f59e0b"
                  radius={[0, 5, 5, 0]}
                  barSize={20}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* ===================================================
            ACTUAL → PREDICTED
        =================================================== */}

        <div
          className="
            rounded-2xl
            border border-white/6
            bg-[#111827]/60
            p-6
          "
        >

          <div className="mb-5">

            <p className="text-sm font-semibold text-white">
              Actual → Predicted
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Most important severity misclassifications.
            </p>

          </div>


          <div className="space-y-3">

            {errorTransitions.map((item) => (

              <div
                key={`${item.actual}-${item.predicted}`}
                className="
                  rounded-xl
                  border border-white/5
                  bg-white/2
                  p-3
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <span
                      className="
                        rounded-lg
                        bg-white/5
                        px-2 py-1
                        text-[10px]
                        font-medium
                        text-slate-400
                      "
                    >
                      {item.actual}
                    </span>

                    <ArrowRight
                      size={13}
                      className="text-slate-600"
                    />

                    <span
                      className="
                        rounded-lg
                        bg-amber-500/8
                        px-2 py-1
                        text-[10px]
                        font-medium
                        text-amber-400
                      "
                    >
                      {item.predicted}
                    </span>

                  </div>


                  <span
                    className="
                      text-sm
                      font-bold
                      text-white
                    "
                  >
                    {item.count}
                  </span>

                </div>

              </div>

            ))}

          </div>


          {/* Key observation */}

          <div
            className="
              mt-5
              rounded-xl
              border border-cyan-500/10
              bg-cyan-500/4
              p-4
            "
          >

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-cyan-400
              "
            >
              Key observation
            </p>

            <p
              className="
                mt-2
                text-xs
                leading-5
                text-slate-400
              "
            >
              Most errors involve confusion between
              Class 1 and Class 2. Class 3 misclassification
              is comparatively rare in the test results.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}