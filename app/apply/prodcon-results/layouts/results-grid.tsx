"use client";

// Types for the application data
type Application = {
  name: string;
  status: "Shortlisted" | "Finalized" | "Confirmed" | "Rejected";
};

type ApplicationType = "Individual" | "Team";

export default function ProdConResultsGrid() {
  // Placeholder data arrays - will be replaced with actual data
  const individualApplications: Application[] = [];
  const teamApplications: Application[] = [];

  const statuses: Application["status"][] = [
    "Shortlisted",
    "Finalized",
    "Confirmed",
    "Rejected",
  ];

  const applicationTypes: ApplicationType[] = ["Individual", "Team"];

  // Helper function to filter applications by status
  const getApplicationsByStatus = (
    applications: Application[],
    status: Application["status"]
  ) => {
    return applications.filter((app) => app.status === status);
  };

  return (
    <div className="space-y-8 py-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          ProdCon Results
        </h1>
      </div>

      {/* Results Grid */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px] md:min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-5 gap-2 md:gap-4 border-b pb-3 md:pb-4 mb-3 md:mb-4">
            <div className="font-semibold text-xs md:text-sm lg:text-base">
              Application Type
            </div>
            {statuses.map((status) => (
              <div
                key={status}
                className="font-semibold text-xs md:text-sm lg:text-base text-center"
              >
                {status}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {applicationTypes.map((type) => {
            const applications =
              type === "Individual"
                ? individualApplications
                : teamApplications;

            return (
              <div
                key={type}
                className="grid grid-cols-5 gap-2 md:gap-4 mb-4 md:mb-6 last:mb-0"
              >
                {/* Row Label */}
                <div className="font-medium text-xs md:text-sm lg:text-base flex items-center">
                  {type}
                </div>

                {/* Status Columns */}
                {statuses.map((status) => {
                  const filteredApps = getApplicationsByStatus(
                    applications,
                    status
                  );

                  return (
                    <div
                      key={`${type}-${status}`}
                      className="border rounded-lg p-2 md:p-4 bg-card min-h-[120px] md:min-h-[150px] max-h-[250px] md:max-h-[300px] overflow-y-auto"
                    >
                      {filteredApps.length > 0 ? (
                        <ul className="space-y-1 md:space-y-2">
                          {filteredApps.map((app, index) => (
                            <li
                              key={`${type}-${status}-${index}`}
                              className="text-xs md:text-sm text-foreground"
                            >
                              {app.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs md:text-sm text-muted-foreground text-center py-4">
                          No applications
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

