"use client";

import * as React from "react";
import RouterLink from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";
import { isNavItemActive } from "@/lib/is-nav-item-active";
import { Logo } from "@/components/core/logo";
import { Avatar, Grid } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { truncateString } from "@/lib/helpers";
import { useSelector } from "react-redux";
import { UserPopover } from "./user-popover";
import { usePopover } from "@/hooks/use-popover";

const navItems = [
  {
    key: "settings",
    title: "Some menu",
    href: "/some-path",
  },
];

const SideNavContent = () => {
  const { name } = useSelector((store: any) => store.auth);
  const pathname = usePathname();

  const userPopover = usePopover<HTMLDivElement>();
  return (
    <Grid
      sx={{
        height: "100vh",
        borderRight: "1px solid var(--SideNav-background)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Grid sx={{ p: 1, display: "flex", alignItems: "center", gap: "10px" }}>
        <Box
          component={RouterLink}
          href={paths.private.dashboard}
          sx={{ display: "block", width: "fit-content" }}
        >
          <Logo emblem color="light" height={40} width={40} />
        </Box>
        <Typography variant="h6">{truncateString(name, 20)}</Typography>
      </Grid>
      <Divider sx={{ borderColor: "var(--mui-palette-neutral-700)" }} />
      <Box
        component="nav"
        sx={{
          flex: "1 1 auto",
          p: "12px",
          overflow: "auto",
          flexGrow: 1,
          scrollbarWidth: "thin",
        }}
      >
        {renderNavItems({ pathname, items: navItems })}
      </Box>
      <Grid>
        <Divider sx={{ borderColor: "var(--mui-palette-neutral-700)" }} />
        <Grid sx={{ paddingX: "12px", marginY: "10px" }}>
          <Grid
            onClick={userPopover.handleOpen}
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              borderRadius: "15px",
              ":hover": {
                backgroundColor: "var(--NavItem-hover-background)",
              },
            }}
          >
            <Avatar ref={userPopover.anchorRef}>{name[0]}</Avatar>
            <Typography variant="h6">Account Setting</Typography>
          </Grid>
        </Grid>
      </Grid>
      <UserPopover
        anchorEl={userPopover.anchorRef.current}
        onClose={userPopover.handleClose}
        open={userPopover.open}
      />
    </Grid>
  );
};

export default SideNavContent;

function renderNavItems({
  items = [],
  pathname,
}: {
  items?: NavItemConfig[];
  pathname: string;
}): React.JSX.Element {
  const children = items.reduce(
    (acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
      const { key, ...item } = curr;

      acc.push(<NavItem key={key} pathname={pathname} {...item} />);

      return acc;
    },
    []
  );

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: "none", m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

interface NavItemProps extends Omit<NavItemConfig, "items"> {
  pathname: string;
}

function NavItem({
  disabled,
  external,
  href,
  matcher,
  pathname,
  title,
}: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({
    disabled,
    external,
    href,
    matcher,
    pathname,
  });

  return (
    <li>
      <Box
        {...(href
          ? {
              component: external ? "a" : RouterLink,
              href,
              target: external ? "_blank" : undefined,
              rel: external ? "noreferrer" : undefined,
            }
          : { role: "button" })}
        sx={{
          alignItems: "center",
          borderRadius: 1,
          color: "var(--NavItem-color)",
          cursor: "pointer",
          display: "flex",
          flex: "0 0 auto",
          gap: 1,
          p: "6px 10px",
          position: "relative",
          textDecoration: "none",
          whiteSpace: "nowrap",
          ...(disabled && {
            bgcolor: "var(--NavItem-disabled-background)",
            color: "var(--NavItem-disabled-color)",
            cursor: "not-allowed",
          }),
          ...(active && {
            bgcolor: "var(--NavItem-active-background)",
            color: "var(--NavItem-active-color)",
          }),
          ":hover": {
            backgroundColor: "var(--NavItem-hover-background)",
          },
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flex: "0 0 auto",
          }}
        >
          <ArticleIcon
            fill={
              active
                ? "var(--NavItem-icon-active-color)"
                : "var(--NavItem-icon-color)"
            }
            // @ts-ignore
            fontSize="var(--icon-fontSize-md)"
            weight={active ? "fill" : undefined}
          />
        </Box>
        <Box sx={{ flex: "1 1 auto" }}>
          <Typography
            component="span"
            sx={{
              color: "inherit",
              fontSize: "0.875rem",
              fontWeight: 500,
              lineHeight: "28px",
            }}
          >
            {title ? truncateString(title, 34) : ""}
          </Typography>
        </Box>
      </Box>
    </li>
  );
}
