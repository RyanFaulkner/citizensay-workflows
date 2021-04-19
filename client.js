export * from "./lib/api/index";
export * from "./lib/ui/index";

import { i18n, library, addRoute, renderWithId } from "meteor/citizensay:core";

import { faCommentDots, faEnvelope, faPlus, faHandshake, faCog, faMousePointer, faTrash, faPoll  } from "@fortawesome/free-solid-svg-icons";
import { Explore } from "./lib/ui/components/Explore";
import { Create } from "./lib/ui/components/Create";
import { Join } from "./lib/ui/components/Join";
import { Participate } from "./lib/ui/components/active/Participate";
import { Review } from "./lib/ui/components/active/Review";


i18n.addResource("en", "groups", "collaborate", "Collaborate")
        .addResources("en", "tiles", {
            explore: "Explore",
            exploreDesc: "My active consultations",
            create: "Create",
            createDesc: "Create a consultation",
            join: "Join/Leave",
            joinDesc: "Manage invitations"
        })
        .addResources("en", "cards", {
            draft: "Draft",
            edit: "Edit",
            delete: "Delete",
            participate: "Participate",
            review: "Review"
        })
        .addResources("en", "tabs", {
            workflowEditor: "Workflow Editor",
            basic: "Basic",
            activities: "Activities",
            participants: "Participants",
            schedule: "Schedule"
        })
        .addResources("en", "editors", {
            title: "Title",
            description: "Description"
        });

library.add(
    faCommentDots,
    faEnvelope,
    faPlus,
    faHandshake,
    faCog,
    faMousePointer,
    faTrash,
    faPoll
);

[
    {
        path: "/explore",
        component: Explore
    },
    {
        path: ["/create/:id", "/create"],
        render: ({ match }) => renderWithId(Create, match.params.id)
    },
    {
        path: "/join",
        component: Join
    },
    {
        path: "/participate/:id",
        render: ({ match }) => renderWithId(Participate, match.params.id)
    },
    {
        path: "/review/:id",
        render: ({ match }) => renderWithId(Review, match.params.id)
    }
].forEach(r =>
    addRoute(r)
);