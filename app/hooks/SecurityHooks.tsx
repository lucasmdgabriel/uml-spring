import { RouteType, SecurityType } from "@/context/SecurityContext";

type Method = "create" | "read" | "update" | "delete" | "list";
type RouteMethod = keyof RouteType;

const methodToRouterMethod: Record<Method, RouteMethod> = {
    "create": "post",
    "read": "get",
    "update": "put",
    "delete": "delete",
    "list": "getAll"
}

export function convertSecurityData(roles: string[], securityConfig: SecurityType, securityRolesActive: Record<string, boolean>): SecurityType {
    for (const securityRoute of securityConfig.securityRouters) {
        const securityMethods: Method[] = ["create","read","update","delete","list"];
        
        for (const method of securityMethods) {

            const methodRoles = getRoles(securityRoute.url, method, roles, securityRolesActive);

            if (method == "create") {
                securityRoute.post = methodRoles;
            }
            else if (method == "read")
                securityRoute.get = methodRoles;
            else if (method == "update")
                securityRoute.put = methodRoles;
            else if (method == "delete")
                securityRoute.delete = methodRoles;
            else if (method == "list")
                securityRoute.getAll = methodRoles;
        }
    }
    
    securityConfig.roles = roles;
    return securityConfig;
}

function getRoles(securityRouteUrl: string, method: Method, roles: string[], securityRolesActive: Record<string, boolean>): string[] {
    let methodRoles: string[] = []

    for (const role of roles) {
        const value = securityRouteUrl+method+role;

        if (securityRolesActive[value]) {
            methodRoles = [... methodRoles, role];
        }
    }

    return methodRoles;
}