/*
 * Copyright Lumens Team, Inc. All Rights Reserved.
 */
package com.hrcms.server.dao;

import java.net.URL;
import java.net.URLClassLoader;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

/**
 *
 * @author shaofeng wang
 */
public class DbUtils {
    public static void releaseConnection(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException ex) {
            }
        }
    }

    public static void releaseResultSet(ResultSet ret) {
        if (ret != null) {
            try {
                ret.close();
            } catch (SQLException ex) {
            }
        }
    }

    public static void releaseStatement(Statement stat) {
        if (stat != null) {
            try {
                stat.close();
            } catch (SQLException ex) {
            }
        }
    }
}