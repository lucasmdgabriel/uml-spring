import { pluralizeWord } from "@/app/hooks/Pluralize";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { usePlantUMLContext } from "@/context/PlantUMLContext";
import { useEffect, useState } from "react";

interface RoleColorType {
    color: string,
    bgColor: string,
}

interface RouteType {
    "url": string,
    "get": string[],
    "post": string[],
    "getAll": string[],
    "put": string[],
    "delete": string[]
}

interface SecurityType {
    "roles": string[],
    "securityRouters": RouteType[]
}

export default function SecurityView() {
    const { plantUmlData, setPlantUmlData } = usePlantUMLContext();

    const [security, setSecurity] = useState<SecurityType>({
        "roles": [],
        "securityRouters": []
    });

    const fakeEntities = {
        entities: [
            {name: "borussia"},
            {name: "barcelona"},
            {name: "milan"}
        ]
    }
    
    const roleColors: RoleColorType[] = [
        {color: "#1E40AF", bgColor: "#DBEAFE"},
        {color: "#166534", bgColor: "#DCFCE7"},
        {color: "#6B21A8", bgColor: "#F3E8FF"}
    ]

    const methods = ["create", "read", "update", "delete", "list"];

    const [newRoleName, setNewRoleName] = useState("");
    const [newRoleNameError, setNewRoleNameError] = useState("");
    const [newRoleIndex, setNewRoleIndex] = useState(0);

    const [roles, setRoles] = useState<string[]>([]);
    const [rolesData, setRolesData] = useState<Record<string, RoleColorType>>({});

    const [securityRolesActive, setSecurityRolesActive] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (fakeEntities == null || fakeEntities.entities == null)
            return;

        let newSecurity: SecurityType = {
            "roles": [],
            "securityRouters": []
        };

        for (let i = 0; i < fakeEntities.entities.length; i++) {
            const newRole = fakeEntities.entities[i].name;

            newSecurity.roles = [
                ... newSecurity.roles,
                newRole
            ];

            newSecurity.securityRouters = [
                ... newSecurity.securityRouters,
                {
                    "url": "/api/"+pluralizeWord(newRole),
                    "get": [],
                    "post": [],
                    "delete": [],
                    "getAll": [],
                    "put": []
                }
            ];
        }

        setSecurity(newSecurity);

        console.log(newSecurity);
    }, []);



    function addRole(newRoleName: string) {
        if (newRoleName == "") {
            setNewRoleNameError("O nome da nova função não pode ser vazio.")
            return;
        }

        if (roles.length >= 5) {
            setNewRoleNameError("O número máximo de cargos é 5.")
            return;
        }

        if (rolesData[newRoleName] != null) {
            setNewRoleNameError("O cargo escolhido já existe.")
            return;
        }

        if (newRoleName.length > 12) {
            setNewRoleNameError("O tamanho do nome do cargo máximo é 12.")
            return;
        }

        setNewRoleNameError("");

        setRoles([
            ... roles,
            newRoleName
        ]);

        setRolesData({
            ... rolesData,
            [newRoleName]: {
                ... roleColors[newRoleIndex % roleColors.length]
            }
        });

        setNewRoleName("");
        setNewRoleIndex(newRoleIndex + 1);
    }

    return (
        <div className="w-full min-h-screen bg-[#F9FAFB] flex justify-center pt-[40px] px-4 pb-4">
            <main className="max-w-[1000px] bg-white flex h-fit border border-[#E5E7EB] p-4 pb-8 flex-col gap-[48px]">
                <Header
                    title="Segurança de Endpoints"
                    description="Defina suas funções (roles) e, em seguida, adicione-as ou remova-as de cada permissão de endpoint."
                />

                <div className="flex justify-between flex-wrap gap-[16px]">
                    <div className="flex gap-2 flex-wrap">
                        {
                            roles.map((item, index) => {
                                return (
                                    <Button
                                        key={index}
                                        name={item}
                                        color={rolesData[item].color}
                                        bg={rolesData[item].bgColor}
                                        borderColor={""}
                                        px="px-[9px]"
                                        py="py-[4px]"
                                        borderRadius={8}
                                        onClick={() => {
                                            
                                        }}/>
                                    )
                            })
                        }
                    </div>

                    <div className="flex gap-2 items-start">
                        <div className="w-[192px] h-9">
                            <Input
                                placeHolder={"Adicionar nova função"}
                                value={newRoleName}
                                error={newRoleNameError}
                                changeValue={(e: string) => {
                                    setNewRoleName(e)
                                }}
                                bgColor="bg-white"
                                rounded="rounded-[6px]"
                            />
                        </div>
                        <Button
                            name={"Adicionar"}
                            color={"#fff"}
                            bg={"#3B82F6"}
                            px={"px-[16px]"}
                            py={"py-[9px]"}
                            borderColor={""}
                            onClick={() => {
                                addRole(newRoleName);
                            }}/>
                    </div>
                </div>

                {
                    security.securityRouters.map((securityRouter, index) => {
                        return (
                            <div key={index} className="w-full flex flex-col items-center">
                                <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-6 py-4 flex flex-col">
                                    <a className="text-[#111827] font-bold text-lg">{fakeEntities.entities[index].name}</a>
                                    <a className="text-[#6B7280] text-sm">{securityRouter.url}</a>
                                </div>

                                {
                                    methods.map((method, indexMethod) => {
                                        return (
                                            <div key={indexMethod} className="w-full border border-[#E5E7EB] px-6 py-4 flex justify-between">
                                                <a className="text-[#111827] font-bold text-sm">{method.toUpperCase()}</a>

                                                <div className="flex gap-2 flex-wrap">
                                                    {
                                                        !securityRolesActive[securityRouter.url+method+"permitAll"] ?
                                                        <Button
                                                            name={"Sem autenticação"}
                                                            color={"#fff"}
                                                            bg={"#969696"}
                                                            borderColor={""}
                                                            px="px-[9px]"
                                                            py="py-[4px]"
                                                            borderRadius={8}
                                                            onClick={() => {
                                                                setSecurityRolesActive({
                                                                    ... securityRolesActive,
                                                                    [securityRouter.url+method+"permitAll"]: true
                                                                })
                                                            }
                                                        }/>
                                                        
                                                        :

                                                        <Button
                                                            name={"Sem autenticação"}
                                                            color={"#fff"}
                                                            bg={"#aa0000"}
                                                            borderColor={""}
                                                            px="px-[9px]"
                                                            py="py-[4px]"
                                                            borderRadius={8}
                                                            onClick={() => {
                                                                setSecurityRolesActive({
                                                                    ... securityRolesActive,
                                                                    [securityRouter.url+method+"permitAll"]: false
                                                                })
                                                            }
                                                        }/>
                                                    }
                                                        
                                                    {
                                                    
                                                    roles.map((role, indexRole) => {
                                                        return (
                                                            <div key={indexRole} className="flex flex-1">
                                                                {
                                                                    !securityRolesActive[securityRouter.url+method+role]
                                                                    || securityRolesActive[securityRouter.url+method+"permitAll"] == true ?
                                                                    <Button
                                                                        name={role}
                                                                        color={"#fff"}
                                                                        bg={"#969696"}
                                                                        borderColor={""}
                                                                        px="px-[9px]"
                                                                        py="py-[4px]"
                                                                        borderRadius={8}
                                                                        onClick={() => {
                                                                            setSecurityRolesActive({
                                                                                ... securityRolesActive,
                                                                                [securityRouter.url+method+role]: true
                                                                            })
                                                                        }
                                                                    }/>
                                                                    
                                                                    :

                                                                    <Button
                                                                        name={role}
                                                                        color={rolesData[role].color}
                                                                        bg={rolesData[role].bgColor}
                                                                        borderColor={""}
                                                                        px="px-[9px]"
                                                                        py="py-[4px]"
                                                                        borderRadius={8}
                                                                        onClick={() => {
                                                                            setSecurityRolesActive({
                                                                                ... securityRolesActive,
                                                                                [securityRouter.url+method+role]: false
                                                                            })
                                                                        }
                                                                    }/>
                                                                }

                                                                
                                                            </div>
                                                            
                                                        )
                                                    })
                                                    }
                                                </div>
                                                
                                            </div>

                                        )
                                    })
                                }
                                
                            </div>
                        )
                    })
                }
            </main>
        </div>
    )
}